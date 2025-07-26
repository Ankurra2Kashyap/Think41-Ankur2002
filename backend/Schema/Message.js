const mongoose = require('mongoose');
// const { timeStamp } = require('node:console');
 const conversationSchema = new mongoose.Schema({
     conversation:{type:mongoose.Schema.Types.ObjectId, ref:'Conversation'},
     role:{type:String,enum:['user','ai'],required:true},
     content:String,
     timestamp:{type:Date,default:Date.now}
 });

 module.exports = mongoose.model('Message',messageSchema);