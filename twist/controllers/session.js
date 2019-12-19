let session = require('../models/perSessionInfo');
let speaker=require('../models/speaker');
let topic=require('../models/topicReferenceTable');
let block=require('../models/blockReferenceTable');
let room=require('../models/roomReferenceTable');
const validator = require('express-validator');

var async = require('async');

exports.newSession = [
    (req, res, next) => {
        var newSession = new session({
        roomNumber: req.body.roomNumber,
        topicId: req.body.topicId,
        blockNumber: req.body.blockNumber
        //participants: req.body.participants
        });
        newSession.save(function(err){
            if (err) {return next(err);}
        });
        res.redirect('/dashboard');
    }
]

exports.newSpeaker=[
    validator.sanitizeBody('firstName','lastName','email','phone','topic').escape(),

    (req,res,next)=>{
        const errors=validator.validationResult(req);

        var newTopic=new topic({
            topicName:req.body.topicName,
            topicDesc:req.body.topicDesc
        })

        var newSpeaker=new speaker({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            phone:req.body.phone,
            topic:newTopic._id
        })

        if (!errors.isEmpty()){
            res.render('dashboard/add-speaker/add-speaker',{firstName:newSpeaker.firstName,lastName:newSpeaker.lastName,email:newSpeaker.email,phone:newSpeaker.phone,topic:newSpeaker.topic,errors:errors.array()});
            return;
        }
        else{
            newTopic.save(function(err){
                if(err){return next(err);}
            });
            newSpeaker.save(function(err){
                if(err){return next(err);}
            });
            res.redirect('/dashboard');
        }
    }
]

exports.getEditSpeaker=function(req,res,next){
    async.parallel({
        speaker: function(callback){
            speaker.findById(req.params.speaker_id)
                .populate('topic')
                .exec(callback)
        },
        topic: function(callback){
            topic.find({'speaker':req.params.speaker_id})
                .exec(callback)
        }
    }, function(err,results){
        if(err){return next(err);}
        console.log(results.speaker)
        console.log(results.topic)
        res.render('dashboard/edit-speaker/edit-speaker',{speaker:results.speaker,topic:results.topic});
    });
}
// return speaker.findById(req.params.speaker_id)
//     .then(speak=>{
//         res.render('dashboard/edit-speaker/edit-speaker',{speaker:speak});
//     });

exports.updateSpeaker = function(req, res, next){
  var newSpeaker = new speaker(
  {
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    phone:req.body.phone,
    _id: req.params.speaker_id
  });
  
  speaker.findByIdAndUpdate(req.params.speaker_id, newSpeaker, function(err){
    if (err){return next(err)}
    res.redirect('/dashboard/speaker-list');
  });
}

exports.newBlock=[
    validator.sanitizeBody('blockNumber','blockStart','blockEnd').escape(),

    (req,res,next)=>{
        const errors=validator.validationResult(req);

        var newBlock=new block({
            blockNumber:req.body.blockNumber,
            blockStart:req.body.blockStart,
            blockEnd:req.body.blockEnd,
        })

        if (!errors.isEmpty()){
            res.render('dashboard/add-block/add-block',{blockNumber:newBlock.blockNumber,blockStart:newBlock.blockStart,blockEnd:newBlock.blockEnd,errors:errors.array()});
            return;
        }
        else{
            newBlock.save(function(err){
                if(err){return next(err);}
            })
            res.redirect('/dashboard');
        }
    }
]

exports.getCreateSession=function(req,res,next){
    async.parallel({
        topics: function(callback) {
            topic.find(callback);
        },
        rooms: function(callback) {
            room.find(callback);
        },
        blocks: function(callback) {
            block.find(callback);
        },
    }, function(err,results){
        if(err){return next(err);}
        res.render('dashboard/create-session/create-session',{topics:results.topics,rooms:results.rooms,blocks:results.blocks});
    });
};

exports.blockList=function(req,res,next){
    block.find()
        .exec(function(err,list_blocks){
            if(err){return next(err);}
            res.render('dashboard/edit-block/block-list',{block_list:list_blocks});
        });
};

exports.speakerList=function(req,res,next){
    speaker.find()
        .populate('topic')
        .exec(function(err,list_speaker){
            if(err){return next(err);}
            res.render('dashboard/edit-speaker/speaker-list',{speaker_list:list_speaker});
        });
};

exports.getEditBlock = function(req, res, next){
  async.parallel({
    block: function(callback){
      block.findById(req.params.block_id)
        .exec(callback);
    }
  }, function(err, results){
    if(err){return next(err);}
    res.render('dashboard/edit-block/edit-block', {block: results.block});
  });
}

exports.updateBlock = function(req, res, next){
  var newBlock = new block(
  {
    blockNumber:req.body.blockNumber,
    blockStart:req.body.blockStart,
    blockEnd:req.body.blockEnd,
    _id: req.params.block_id
  });
  block.findByIdAndUpdate(req.params.block_id, newBlock, function(err){
    if (err){return next(err)}
    res.redirect('/dashboard/block-list');
  });
}