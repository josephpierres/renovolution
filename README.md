Projet renovolution
#Une application client serveur ayant pour front-end vuejs et ses complices et pour backend express passport et ses complices sur une base de données mysql
#d'abord, nous allons utiliser les generator pour aller plus vite. Nous commencons par le serveur, la partie le moins compliqu� de l'appli.

#pour créer le serveur on a besoin de express-generator et squelize-cli et mysql driver pour la connection
npm install express express-generator sequelize sequelize-cli mysql
#creation du serveur avec view engine pug
node_modules\.bin\express --pug -f
npm install
#pour tester le serveur
npm start
#si vous voyez "Express welcome to express" c'est bien.

#ensuite vient l'ORM sequelize
node_modules\.bin\sequelize init
# les folders créés, il faut ajouter sequelize dans le serveur Express ainsi que les models
## voir le code ajouté dans le fichier bin\www ##
#maintenant continuons avec Passport pour l'authentification
npm install --save passport passport-local bcrypt-nodejs connect-flash express-session body-parser dotenv  
# la plupart de ces packages sont tres populaires dans le dev et le prod sauf dotenv (tres dangereux de faire le setting des variables d'environnement conceptuellement)


### avant de demarrer le seveur, Sequelize-cli fait une erreur de path dans ..\model\index.js #
