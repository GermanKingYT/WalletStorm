const routes = require('express').Router();
var db = require("../models");

routes.get('/', (req, res) => {
    res.render('wallets', {
        title: 'Walletstorm - Wallets',
        name: 'Test'
    });
});

routes.get('/add', (req, res) => {
    
    db.Coin.findAll({
        raw: true,
        attributes: ['name']
    }).then((coins) => {
        console.log(coins);
        res.render('walletsAdd', {
            title: 'Walletstorm - Add Wallet',
            currencyName: coins
        });
    });
});

module.exports = routes;