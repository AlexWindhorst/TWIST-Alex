var mongoose = require('mongoose');
var topic = require('./topicReferenceTable');

var Schema = mongoose.Schema;

var SpeakerSchema = new Schema(
  {
	lastName: {type: String, required: true},
	firstName: {type: String, required: true},
	email: {type: String, required: true},
	phone: {type: String, required: true},
	topic: {type: Schema.ObjectId, ref: 'topic', required: true},
  }
);

SpeakerSchema
.virtual('name')
.get(function(){
  return this.lastName+', '+this.firstName;
});

SpeakerSchema
.virtual('fname')
.get(function(){
  return this.firstName;
});

SpeakerSchema
.virtual('lname')
.get(function(){
  return this.lastName;
});

SpeakerSchema
.virtual('mail')
.get(function(){
  return this.email;
});

SpeakerSchema
.virtual('phon')
.get(function(){
  return this.phone;
});

module.exports = mongoose.model('speaker', SpeakerSchema);