var express = require('express');

var router = express.Router();
var  {signup,hasUsername,signin,issignin,signout} = require('../controller/users') 
/* GET users listing. */
router.post('/signup',hasUsername,signup);
router.post('/signin',signin);
router.get('/issignin',issignin);
router.get('/signout',signout);

module.exports = router;
