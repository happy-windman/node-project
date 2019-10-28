var express = require('express');

var router = express.Router();

const position = require('../controller/position')
/* GET users listing. */
router.get('/findAll',position.findAll);


module.exports = router;
