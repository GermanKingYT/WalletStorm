const routes = require('express').Router();
var db = require("../models");

routes.get('/', (req, res) => {
    
    db.Wallet.findAll({
        raw : true,
        include : [{
            model : db.User,
            where : {id : req.session.user.id}
        }, {
            model : db.Coin
        }]
    }).then((wallets) => {
        
        console.log(wallets);
        
        res.render('wallets', {
            title: 'Walletstorm - Wallets',
            name: 'Test',
            wallet: wallets
        });
    });
});

routes.get('/add', (req, res) => {
    
    console.log(req.session.user);
    
    db.Coin.findAll({
        raw: true,
        attributes: ['name']
    }).then((coins) => {
        res.render('walletsAdd', {
            title: 'Walletstorm - Add Wallet',
            currencyName: coins
        });
    });
});

module.exports = routes;