//Requirements for the app
var dotenv = require('dotenv').config();
var path = require('path');
var express = require('express');
var models = require("./models");

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();
//Setup handlebars for the templating engine
var handlebars = require('express-handlebars').create({
  layoutsDir: path.join(__dirname, "views/layouts"),
  defaultLayout: 'layout',
  extname: 'hbs'
});

//More handlebars setup
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

//Use sessions for tracking logins
app.use(session({
    key: 'user_sid',
    secret: process.env.SERVER_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        expires: 60000000
    }
}));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
        res.redirect('/auth/login');
    } else {
        next();
    }
});

//Declare the routes
var routes = require('./routes');
//Use the routes
app.use('/', routes);

app.use(express.static('public'));  

//404 if no page is found
app.use(function(req,res){  
	res.status(404);
	res.render('404', {
        title:'404: Page not found'
    });
});

var http = require('http').Server(app);

models.sequelize.sync({ force: true }).then(function () {
    if(process.env.NODE_ENV.trim() === "development"){
        //Seed the database. Just for initial development, will be changed to seeders later on.
        models.Coin.create({
            name: 'Bitcoin',
            code: 'BTC',
            apiEndpoint: 'https://chain.so/api/v2/get_address_balance/BTC/'
        }).then(function () {
            models.User.create({
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
                firstName: process.env.ADMIN_FIRSTNAME,
                lastName: process.env.ADMIN_LASTNAME
            }).then(function(user) {
                models.Wallet.create({
                    UserId: user.id,
                    CoinId: 1,
                    address: '15PFLdc645mMmTi8ss5WrzVQ6gzYhGUNiA'
                });
            });
        });
    }
    http.listen(process.env.SERVER_PORT, function(){
        console.log("Server is running.");
        if(process.env.NODE_ENV === "travis"){
            process.exit();
        }
    })
});