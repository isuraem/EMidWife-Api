var express = require('express');
var router = express.Router();


require('./exerciseRoutes')(router);

module.exports = router;