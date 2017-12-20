const routes = require('express').Router();

//Default route for no sub-page
routes.get('/', (req, res) => {
});

var login = require('./auth.js');
routes.use('/auth', login);

module.exports = routes;