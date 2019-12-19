var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HighschoolSchema = new Schema(
  { // We can use Mongo's randomly generated ID as an identity property
    name: {type: String, required: true},
    counselor: {type: String, required: true},
    counselorEmail: {type: String},
    counselorPhone: {type: String},
    address: {type: String},
    city: {type: String},
    state: {type: String},
    zip: {type: String}
  }
);

HighschoolSchema
.virtual('flName')
.get(function(){
return this.name;
});

HighschoolSchema
.virtual('counselorName')
.get(function(){
return this.counselor;
});

HighschoolSchema
.virtual('cEmail')
.get(function(){
return this.counselorEmail;
});

HighschoolSchema
.virtual('cPhone')
.get(function(){
return this.counselorPhone;
});

HighschoolSchema
.virtual('addy')
.get(function(){
return this.address;
});

HighschoolSchema
.virtual('citty')
.get(function(){
return this.city;
});

HighschoolSchema
.virtual('statey')
.get(function(){
return this.state;
});

HighschoolSchema
.virtual('zippy')
.get(function(){
return this.zip;
});

module.exports = mongoose.model('highschool', HighschoolSchema);