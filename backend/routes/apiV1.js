var express = require('express');
var router = express.Router();

router.post('/addUser', function(req, res, next) {
  res.send('/addUser');
});

router.get('/getUserList', function(req, res, next) {
  res.send('/getUserList');
});

router.get('/getUser/user_id/:user_id', function(req, res, next) {
  res.send(req.params.user_id);
});

router.get('/getUser/username/:username', function(req, res, next) {
  res.send('/getUser/username/:username');
});

router.get('/getUser/user_id/:user_id', function(req, res, next) {
  res.send('/getUser/user_id/:user_id');
});

module.exports = router;
