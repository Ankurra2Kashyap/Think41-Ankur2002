const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/ecommerce1',{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });

        console.log('MongoDB connected successfully');
    } catch(error){
        console.error('MongoDB connection failer');
        process.exit(1);
    }
};

module.exports = connectDB