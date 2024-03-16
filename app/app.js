var express = require('express');
var router = express.Router();


var exerciseRoutes = require('./routes/exercises/exerciseMain');
var motherRoutes = require('./routes/mothers/motherMain');
var weekRoutes = require('./routes/weeks/weekMain');


router.use('/exercise', exerciseRoutes);
router.use('/mother', motherRoutes);
router.use('/week', weekRoutes);

module.exports = router;