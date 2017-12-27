const routes = require('express').Router();
var models = require("../models");

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

routes.get('/wallets', sessionChecker, (req, res) => {
    res.render('wallets', {
        title: 'Walletstorm - Wallets'
    });
});

module.exports = routes;