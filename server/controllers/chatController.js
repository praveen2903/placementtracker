const express=require("express");
const Chat = require("../models/chatModel");
const expressAsyncHandler = require("express-async-handler");


const getChats=async(req,res)=>{
    const chats=await Chat.find({});
    return res.send(chats);
};
const updateChats=async(req,res)=>{
    const id=req.params.id;
    console.log("id",id);
    const chat=await Chat.findById(id);
    if(chat){
        const newchat=await Chat.findByIdAndUpdate(id,{likes:chat.likes+1});
        console.log(newchat);
    }
}
// const sendChats=expressAsyncHandler(async(req,res)=>{
//     const{user,message,likes}=req.body;
//     const result=new Chat({
//         user:user,
//         text:message,
//         likes:likes,
//       });
//       await result.save();
// });
module.exports={getChats,updateChats};