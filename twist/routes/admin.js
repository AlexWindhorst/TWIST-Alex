var express = require('express');
var router = express.Router();
let room = require('../controllers/room');
let session = require('../controllers/session');
let attendee = require('../controllers/attendee');
let auth = require('../controllers/auth');
let sess;

// GET login
router.get('/login', function(req, res, next){
  res.render('login/login', {title: 'Login'});
});

// POST login
router.post('/login', auth.login, function(req, res, next){
  res.redirect('/dashboard');
});

// GET dashboard
router.get('/dashboard', auth.hasAuth, function(req, res, next){
  res.render('dashboard/dashboard');
});

//GET create-session
router.get('/dashboard/create-session', auth.hasAuth, session.getCreateSession);

//POST create-session
router.post('/dashboard/create-session', auth.hasAuth, session.newSession);

//GET edit-session
router.get('/dashboard/session-list/edit-session/:session_id', auth.hasAuth, function(req, res, next){
  res.render('dashboard/edit-session/edit-session');
});

//POST edit-session
router.post('/dashboard/session-list/edit-session/:session_id', auth.hasAuth, function(req, res, next){
  res.redirect('/dashboard');
});

//GET add-attendee
router.get('/dashboard/add-attendee', auth.hasAuth, function(req, res, next){
  res.render('dashboard/add-attendee/add-attendee');
});

//POST add-attendee
router.post('/dashboard/add-attendee', auth.hasAuth, attendee.newAttendee);

//GET attendee-list
router.get('/dashboard/attendee-list', auth.hasAuth, attendee.list);

//GET edit-attendee
router.get('/dashboard/attendee-list/edit-attendee/:people_id', auth.hasAuth, attendee.getEditAttendee);

//POST edit-attendee
router.post('/dashboard/attendee-list/edit-attendee/:attendee_id', auth.hasAuth, attendee.updateAttendee);

//GET add-room
router.get('/dashboard/add-room', auth.hasAuth, function(req, res, next){
  res.render('dashboard/add-room/add-room');
});

//POST add-room
router.post('/dashboard/add-room', auth.hasAuth, room.addRoomPost);

//GET edit-room
router.get('/dashboard/room-list/edit-room/:room_id', auth.hasAuth, room.getEditRoom);

//GET room-list
router.get('/dashboard/room-list', auth.hasAuth, room.list);

//POST edit-room
router.post('/dashboard/room-list/edit-room/:room_id', auth.hasAuth, room.updateRoom);

//GET print-schedule
router.get('/dashboard/print-schedule', auth.hasAuth, function(req, res, next){
  res.render('dashboard/print-schedule/print-schedule');
});

//GET logout
router.get('/logout', auth.logout, function (req, res, next){
  res.redirect('/');
});

//GET add-speaker
router.get('/dashboard/add-speaker', auth.hasAuth, function (req, res, next){
  res.render('dashboard/add-speaker/add-speaker');
});

//POST add-speaker
router.post('/dashboard/add-speaker', auth.hasAuth, session.newSpeaker);

//GET edit-speaker
router.get('/dashboard/speaker-list/edit-speaker/:speaker_id', auth.hasAuth, session.getEditSpeaker);

//GET speaker-list
router.get('/dashboard/speaker-list', auth.hasAuth, session.speakerList);

//POST edit-speaker
router.post('/dashboard/speaker-list/edit-speaker/:speaker_id', auth.hasAuth, session.updateSpeaker);

//GET add-block
router.get('/dashboard/add-block', auth.hasAuth, function(req, res, next){
  res.render('dashboard/add-block/add-block');
});

//POST add-block
router.post('/dashboard/add-block', auth.hasAuth, session.newBlock);

//GET edit-block
router.get('/dashboard/block-list/edit-block/:block_id', auth.hasAuth, session.getEditBlock);

//POST edit-block
router.post('/dashboard/block-list/edit-block/:block_id', auth.hasAuth, session.updateBlock);

//GET block-list
router.get('/dashboard/block-list', auth.hasAuth, session.blockList);

module.exports=router;