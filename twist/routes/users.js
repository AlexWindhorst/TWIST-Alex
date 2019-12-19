var express = require('express');
var router = express.Router();
let attendee=require('../controllers/attendee');

// GET home
router.get('/', function(req, res, next) {
  res.render('index');
});

// GET register
router.get('/register',attendee.showRegister);

//POST register
router.post('/register',attendee.newAttendee);

//The redirect sends a GET for /confirmation. Route below handles GET
//GET confirmation
router.get('/confirmation',attendee.showConfirmation);

module.exports = router;
