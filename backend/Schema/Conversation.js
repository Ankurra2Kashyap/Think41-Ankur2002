const mongoose = require('mongoose');
 const conversationSchema = new mongoose.Schema({
     user: {type: mongoose.Schema.Types.ObjectId,ref:'User'},
     createdAt:{type:Date,default:Date.now}
 });

 module.exports = mongoose.model('Conversation',conversationSchema);