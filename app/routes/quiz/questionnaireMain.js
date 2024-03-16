var express = require('express');
var router = express.Router();


require('./questionnaireEnglishRoutes')(router);
require('./questionnaireSinhalaRoutes')(router);

module.exports = router;