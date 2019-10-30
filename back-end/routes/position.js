var express = require('express');

var router = express.Router();

const position = require('../controller/position')
/* GET users listing. */
// router.get('/findAll',position.findAll);
// router.post('/position_add',position.position_add)

router.route('/')
 .get(position.findAll)
 .post(position.position_add)
 .patch(position.position_update)
 .delete(position.position_delete)

 router.get('/findOne',position.findOne);
 router.post('/position_search',position.position_search)
module.exports = router;
