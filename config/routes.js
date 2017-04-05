var   controllers = require('../controllers');
var express = require('express');
const router = express.Router();

router.get('/login', controllers.users.getLogin);
router.post('/login', controllers.auths.login);
router.get('/logout', controllers.auths.logout);

router.get('/register', controllers.users.getRegister);
router.post('/register', controllers.users.createUser);

router.get('/', (req, res) =>  res.render('index', {currentUser: req.user}));
router.get('*', function (req, res) {
        res.render('index', {currentUser: req.user});
    });


module.exports =  router;
