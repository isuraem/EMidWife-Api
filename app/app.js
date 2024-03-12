var express = require('express');
var router = express.Router();


var exerciseRoutes = require('./routes/exercises/exerciseMain');
var motherRoutes = require('./routes/mothers/motherMain');



router.use('/exercise', exerciseRoutes);
router.use('/mother', motherRoutes);

module.exports = router;