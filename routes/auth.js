const routes = require('express').Router();
var models = require("../models");

var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
};

routes.get('/login', sessionChecker, (req, res) => {
    res.render('login', {
        title: 'WalletStorm - Login'
    });
});

routes.post('/login', (req, res) => {
    var email = req.body.email,
        password = req.body.password;

    models.User.findOne({ where: {email : email} }).then(function(user) {
        if(user){
            user.validPassword(password).then(result => {
                if(result){
                    req.session.user = user.dataValues;
                    res.redirect('/dashboard');
                } else {
                    res.redirect('/auth/login');
                }               
            });
        } else {
            res.redirect('/auth/login');
        }
    });
});

module.exports = routes;