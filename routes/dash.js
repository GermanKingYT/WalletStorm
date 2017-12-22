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
    res.json({ "TEST": "TEST"});
});

module.exports = routes;