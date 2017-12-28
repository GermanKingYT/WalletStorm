const routes = require('express').Router();

//Default route for no sub-page
routes.get('/', (req, res) => {
});

var auth = require('./auth');
var dash = require('./dash');

routes.use('/auth', auth);
routes.use('/dashboard', dash);

module.exports = routes;