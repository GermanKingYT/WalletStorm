const routes = require('express').Router();

//Default route for no sub-page
routes.get('/login', (req, res) => {
    res.render('login', {
        title: 'WalletStorm - Login'
    });
});

module.exports = routes;