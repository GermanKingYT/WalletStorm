const routes = require('express').Router();
var request = require('request');
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

routes.post('/refresh', (req, res) => {
    var count = 0;
    
    db.Wallet.findAll({
        include: [{
            model: db.User,
            where: {id : req.session.user.id}
        }, {
            model: db.Coin,
            as: 'Coin'
        }]
    }).then((wallets) => {
        var jsonData = JSON.parse(JSON.stringify(wallets));
        
        jsonData.forEach(function(wallet) {
            var url = wallet.Coin.apiEndpoint + wallet.address;
            
            request(url, function(error, response, body) {
                if(!error && response.statusCode == 200){
                    var jsonResponse = JSON.parse(body);
                    var balance = jsonResponse.data.confirmed_balance;
                    
                    db.Wallet.update({
                        balance : balance
                    }, {
                        where : {id : wallet.id}
                    }).then(function() {
                        count++;
                        
                        if(count === jsonData.length){
                            res.json({ result : "Success"});
                        }
                    });
                }
            });
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

routes.post('/add', (req, res) => {
    var walletAddress = req.body.address; 
    var walletCoin = req.body.currency;
    var userID = req.session.user.id;
    
    console.log(req.session.user.id);
    
    db.Coin.findOne({
        where:{
            name: walletCoin,
        }
    }).then(function(coin) {
       db.Wallet.create({
           UserId: userID,
           CoinId: coin.id,
           address: walletAddress
       }).then(function(){
          res.redirect('/dashboard/wallets') ;
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