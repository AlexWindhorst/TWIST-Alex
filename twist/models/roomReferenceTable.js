var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoomReferenceSchema = new Schema(
  {
    roomNumber: {type: String, required: true},
    capacity: {type: Number, required: true}
  }
);

RoomReferenceSchema
.virtual('num')
.get(function(){
  return this.roomNumber;
});

RoomReferenceSchema
.virtual('cap')
.get(function(){
  return this.capacity;
});


module.exports = mongoose.model('Room', RoomReferenceSchema);