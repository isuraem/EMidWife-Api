var express = require('express');
var router = express.Router();

require('./questionnaireEnglishRoutes')(router);
require('./questionnaireSinhalaRoutes')(router);
require('./quizDetailsRoutes')(router);

module.exports = router;