const express = require('express');
const Conversation = require('../Schema/Conversation');
const router = express.Router();
const Message = reuire('../Schema/Message');

router.post('/',async(req,res)=>{
    const {userId,message,conversationId} = req.body;
    let conversation = conversationId?await Conversation.findById(conversationId) :
    await Conversation.create({user:userId});

    const userMessage = await Message.create({
        conversation:conversation._id,
        role:'user',
        constent:message,

    });

    const aiResponse = await Message.create({
        conversation:conversation._id,
        role:'ai',
        content:`AI: Thanks for your message`
    });

    res.json({conversation:conversation._id, message:[userMessage,aiResponse]});
});

module.exports = router;