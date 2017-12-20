//Requirements for the app
var path = require('path');
var express = require('express');
var models = require("./models");
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
    models.User.create({
        email: 'Test',
        password: 'Password'
    })
    http.listen(process.env.SERVER_PORT, function(){
        console.log("Server is running.");
    })
});