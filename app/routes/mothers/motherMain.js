var express = require('express');
var router = express.Router();


require('./motherRoutes')(router);

module.exports = router;