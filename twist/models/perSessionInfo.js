var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PerSessionSchema = new Schema(
  { // We can use Mongo's randomly generated ID as an identity property
    topicId: {type: String, ref: 'topicReferenceTable', required: true},
    blockNumber: {type: Number, ref: 'blockReferenceTable', required: true},
    roomNumber: {type: String, ref: 'roomReferenceTable', required: true},
    participantListId: {type: Schema.Types.ObjectId, ref: 'ParticipantList'}
  }		// Should this reference the participantList table?
);//The name of the session is the topic.

PerSessionSchema
.virtual('tId')
.get(function(){
  return this.topicId;
});

PerSessionSchema
.virtual('bNumber')
.get(function(){
  return this.blockNumber;
});

PerSessionSchema
.virtual('rNumber')
.get(function(){
  return this.roomNumber;
});

PerSessionSchema
.virtual('plId')
.get(function(){
  return this.participantListId;
});

module.exports = mongoose.model('session', PerSessionSchema);