const express=require('express');
const expressAsyncHandler=require('express-async-handler');
const msg=require('../models/msgsModel');
const { StatusCodes } = require('http-status-codes');
const { sendMail } = require('../middleware/sendMail');

const getMessages=async(req,res)=>{
    const Msg=await msg.find();
    res.status(StatusCodes.OK).json({messages:Msg});

};
const deleteMessages = async (req, res) => {
    try {
        const messageId = req.params.id;
        console.log("messageId",messageId);
        const result = await msg.findByIdAndDelete(req.params.id);
        if (result) {
            return res.status(StatusCodes.OK).json({ message: "Delete User review Successfully" });
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Message not found" });
        }
    } catch (err) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Delete User review failed" });
    }
};
const getUsermsg=async(req,res)=>{
    const result=await msg.find({senderroll:req.params.rollno});
    res.send(result);
};

const sendMsg=(expressAsyncHandler(async(req,res)=>{
    const newmsg=new msg({
        name:req.body.name,
        email:req.body.email,
        senderroll:req.body.rollno,
        text:req.body.text,
    });
    await sendMail(req.body.email,req.body.text);
    const msgs=await newmsg.save();
    res.send({
        _id:msgs._id,
        name:msgs.name,
        email:msgs.email,
        senderroll:msgs.senderroll,
        text:msgs.text,
    });
}));
module.exports={getMessages,getUsermsg,sendMsg,deleteMessages};