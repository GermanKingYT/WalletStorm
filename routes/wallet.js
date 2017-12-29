const routes = require('express').Router();
var db = require("../models");

routes.get('/', (req, res) => {
    
    db.Wallet.findAll({
        include : [{
            model : db.User,
            where : {id : req.session.user.id}
        }, {
            model : db.Coin,
            as: 'Coin'
        }]
    }).then((wallets) => {
        var jsonData = JSON.parse(JSON.stringify(wallets));
        res.render('wallets', {
            title: 'Walletstorm - Wallets',
            wallet: jsonData
        });
    });
});

routes.get('/add', (req, res) => {
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

routes.post('/delete', (req, res) => {
    var walletID = req.body.id;
    var userID = req.session.user.id;
    
    db.Wallet.destroy({
        where: {
            id : walletID,
            UserId : userID
        }
    }).then(function() {
        res.json({response : 'Success'});
    });
});

module.exports = routes;