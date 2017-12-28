const routes = require('express').Router();
var models = require("../models");

var wallet = require('./wallet');

var sessionChecker = (req, res, next) => {
    if (!req.session.user && !req.cookies.user_sid) {
        res.redirect('/auth/login');
    } else {
        next();
    }    
};

routes.get('/', sessionChecker, (req, res) => {
    res.render('dashboard', {
        title: 'WalletStorm - Dashboard'
    });
});

routes.use('/wallets', sessionChecker, wallet);

routes.get('/about', sessionChecker, (req, res) => {
   res.render('about', {
       title: 'Walletstorm - About',
       name: 'Test'
   });
});

module.exports = routes;