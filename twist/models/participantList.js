var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ParticipantListSchema = new Schema (
    {
        part1: {type: String, required:true},
        part2: {type: String},
        part3: {type: String},
        part4: {type: String},
        part5: {type: String},
        part6: {type: String},
        part7: {type: String},
        part8: {type: String},
        part9: {type: String},
        part10: {type: String},
        part11: {type: String},
        part12: {type: String},
        part13: {type: String},
        part14: {type: String},
        part15: {type: String},
        part16: {type: String},
        part17: {type: String},
        part18: {type: String},
        part19: {type: String},
        part20: {type: String},
        part21: {type: String},
        part22: {type: String},
        part23: {type: String},
        part24: {type: String},
        part25: {type: String},
        part26: {type: String},
        part27: {type: String},
        part28: {type: String},
        part29: {type: String},
        part30: {type: String},
        part31: {type: String},
        part32: {type: String},
        part33: {type: String},
        part34: {type: String},
        part35: {type: String},
        part36: {type: String},
        part37: {type: String},
        part38: {type: String},
        part39: {type: String},
        part40: {type: String},
        part41: {type: String},
        part42: {type: String},
        part43: {type: String},
        part44: {type: String},
        part45: {type: String},
        part46: {type: String},
        part47: {type: String},
        part48: {type: String},
        part49: {type: String},
        part50: {type: String},
    }
)

ParticipantListSchema
.virtual('url')
// .get( => {
//     //etc
// });

module.exports = mongoose.model('participantList',ParticipantListSchema)