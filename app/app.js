var express = require("express");
var router = express.Router();


var exerciseRoutes = require('./routes/exercises/exerciseMain');
var motherRoutes = require('./routes/mothers/motherMain');
var weekRoutes = require('./routes/weeks/weekMain');
var questionnaireRoutes = require("./routes/quiz/questionnaireMain");
// var questionnaireSinhalaRoutes = require("./routes/quiz/questionnaireSinhalaRoutes");


router.use('/exercise', exerciseRoutes);
router.use('/mother', motherRoutes);
router.use('/week', weekRoutes);
router.use('/quiz', questionnaireRoutes);

module.exports = router;

