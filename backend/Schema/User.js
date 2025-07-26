const mongoose = require('mongoose');
 const usersSchema = new mongoose.Schema({
    name:String,
    email:String,
 });

 module.exports = mongoose.model('User',usersSchema);