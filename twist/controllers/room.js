let Room=require('../models/roomReferenceTable');
const validator = require('express-validator');
var async = require('async');

exports.addRoomPost = [
  validator.body('roomNumber', 'capacity').isLength({min: 1, max: 10}).trim(),
  validator.body('capacity').isNumeric(),
  //Removes potential xss characters
  validator.sanitizeBody('roomNumber', 'capacity').escape(),
  (req, res, next) => {
    const errors = validator.validationResult(req);
    //Create a room
    var room = new Room(
      {roomNumber: req.body.roomNumber,
      capacity: req.body.capacity}
    );
    
    if (!errors.isEmpty()){
      //There's an error
      res.render('dashboard/add-room/add-room', {roomNumber: room.roomNumber, capacity: room.capacity, errors: errors.array()});
      return;
    }
    else{
      Room.findOne({ 'roomNumber': req.body.roomNumber}) //Checks to see if room is already created
        .exec( function(err, foundRoom){
          if (err) {return next(err);}
          //Found one
          if (foundRoom){
            res.render('dashboard/add-room/add-room', {roomNumber: room.roomNumber, capacity: room.capacity, exists: 'Room Already Exists'});
          }
          else{
            room.save(function(err){
              if (err){ return next(err);}
            });
            res.redirect('/dashboard');
          }
        });
    }
  }
]

exports.list=function(req,res,next){
    Room.find()
        .exec(function(err,list_rooms){
            if(err){return next(err);}
            res.render('dashboard/edit-room/room-list',{room_list:list_rooms});
        });
};

exports.getEditRoom = function(req, res, next){
  async.parallel({
    Room: function(callback){
      Room.findById(req.params.room_id)
        .exec(callback);
    }
  }, function(err, results){
    if (err){return next(err);}
    res.render('dashboard/edit-room/edit-room', {Room: results.Room});
  });
}

exports.updateRoom = function(req, res, next){
  var room = new Room(
  {
    roomNumber: req.body.roomNumber,
    capacity: req.body.capacity,
    _id: req.params.room_id
  });
  Room.findByIdAndUpdate(req.params.room_id, room, function(err){
    if (err){return next(err)}
    res.redirect('/dashboard/room-list');
  });
}

// exports.deleteRoom = function(req, res, next){
  // Room.findByIdAndRemove(req.params.room_id, function deleteRoom(err){
    // if (err){return next(err);}
    // res.redirect('/dashboard/room-list');
  // });
// }