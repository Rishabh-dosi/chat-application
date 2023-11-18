const messageModel = require("../model/messageModel");

module.exports.addmsg = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await messageModel.create({
            message: { text: message },
            users: [from, to],
            sender: from,
            

        });
        if (data) return res.json({ msg: "message added" });
        return res.json({ msg: "message failed to add" })
        
    } catch (err) {
        next(err);
    }
    
    
 }
module.exports.getMsg = async (req, res, next) => {
    try {
        
    
    const { from, to } = req.body;
    const messages = await messageModel.find({
        users: {
            $all: [from, to],
        },
    }).sort({ updatedAt: 1 });

    const projectedMsg = messages.map((msg) => {
        return {
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text,
        };
    });
        
    res.json(projectedMsg)
} catch (error) {
    next(error);
}

 }
