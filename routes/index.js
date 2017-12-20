const routes = require('express').Router();

//Default route for no sub-page
routes.get('/', (req, res) => {
});

var login = require('./login.js');
routes.use('/login', login);

module.exports = routes;