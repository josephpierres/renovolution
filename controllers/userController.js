import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import kue from 'kue';
import { SIGNUP_EMAIL } from '../types/worker-jobs';
import models from '../models';
import params from 'config.params';

const router = express.Router();

router.post('/login', (req, res, next) => {
    models.User.find({
        where: { username: req.body.username }
    })
        .then(user => {
            if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
                res.status(403).send('Invalid username or password has been provided');
                return;
            }
            res.json({
                token: jwt.sign({
                    id: user.id,
                    username: user.username,
                    email: user.email
                }, params.jwtPrivateKey)
            });
        })
        .catch(err => res.status(500).send(err));
});

router.get('/verify', (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        res.status(403).send('You have to authenticate before using this endpoint');
        return;
    }
    jwt.verify(token.split(' ')[1], params.jwtPrivateKey, (err, decoded) => {
        if (decoded === undefined) {
            res.status(403).send('You have to authenticate before using this endpoint');
        } else {
            res.end();
        }
    });
});

router.post('/create', (req, res, next) => {
    const enqueueEmail = userId => {
        let job = kue.createQueue().create(SIGNUP_EMAIL, { userId }).save(err => {
            if (err) {
                console.log(err);
            } else {
                console.log('Job sent: ' + job.id);
            }
        });
    };

    let userId;
    return models.sequelize.transaction(function (t) {
        return models.User.create({
            username: res.req.body.username,
            email: res.req.body.email,
            password: bcrypt.hashSync(res.req.body.password, params.bcryptSaltRounds)
        }, { transaction: t }).then(user => {
            userId = user.id;
            return models.Profile.create({
                firstName: res.req.body.firstName,
                lastName: res.req.body.lastName,
                gender: res.req.body.gender,
                birthday: res.req.body.birthDay
            }, { transaction: t }).then(profile => {
                return user.setProfile(profile, { transaction: t });
            });
        });
    })
        .then(() => {
            enqueueEmail(userId);
            res.status(200).end()
        })
        .catch(() => res.status(500).end());
});
