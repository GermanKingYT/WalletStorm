const routes = require('express').Router();

//Default route for no sub-page
routes.get('/', (req, res) => {
});

var auth = require('./auth.js');
routes.use('/auth', auth);

module.exports = routes;