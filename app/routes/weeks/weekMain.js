var express = require('express');
var router = express.Router();


require('./weekRoutes')(router);

module.exports = router;