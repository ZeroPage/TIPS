var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/login', passport.authenticate('local'), function(req, res, next) {
  res.json({ success: 'ok' });
});

router.post('/logout', function(req, res, next) {
  req.logout();
  res.json({ success: 'ok' });
});

module.exports = router;
