const express=require('express');
const Event = require('../models/eventModel');
const expressAsyncHandler = require('express-async-handler');
const Register = require('../models/registerModel');
const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const ClubRegister = require('../models/clubRegisterModel');

const getClubevents=async(req,res)=>{
    const event=await Event.find({});
    res.status(StatusCodes.OK).json({events:event});
};

const getClubregistrations=async(req,res)=>{
    const registers=await Register.find({});
    res.status(200).json({registers});
};
const updateRunner=async(req,res)=>{
    const rollno=String(req.params.roll);
    const exist=await Register.findOne({roll:rollno});
    if(exist.isWinner){
        res.status(StatusCodes.BAD_REQUEST).json({message:"Runner changed unsuccesfully"});
        return;
    }
    const newOne=await Register.findOneAndUpdate({roll:rollno},{isRunner:req.body.isRunner},{new:true});
    res.status(StatusCodes.OK).json({message:"Runner changed succesfully"});

}
const updateWinner=async(req,res)=>{
    try{
        const rollno=String(req.params.roll);
        const exist=await Register.findOne({roll:rollno});
        if(exist.isRunner){
            res.status(StatusCodes.BAD_REQUEST).json({message:"Winner changed unsuccesfully"});
            return;
        }
        const newOne=await Register.findOneAndUpdate({roll:rollno},{isWinner:req.body.isWinner},{new:true});
        console.log(newOne);
        res.status(StatusCodes.OK).json({message:"Winner changed succesfully"});
    }catch(err){
        console.log(err);
    }
}

const eventRegistration=(expressAsyncHandler(async(req,res)=>{
    const{club,event,category,username,image,year,branch,rollno,section}=req.body;
    try{
        //Here first we are checking user registers list and after check club registartion for event register.
            const rollnum = await Register.findOne({ roll: rollno });
            if (rollnum) {
            res.json({ error:true,message: `You already registered for ${rollnum.event} event` });
            return;
            }
            const reg=await ClubRegister.findOne({roll:rollno,club:club});
            if(!reg){
                res.json({error:true,message:`You need to register for ${club} club`});
                return;
            }
            const newRegister=new Register({
            club,
            event,
            category,
            name:username,
            userimage:image,
            year,
            branch,
            roll:rollno,
            section,
            isWinner:false,
            isRunner:false,
        });
        const res1=await newRegister.save();
        res.send(res1);
    }catch(err){
        console.log(err);
        res.status(500).json({ error:err});
    }
}));
const deleteUserregister=async(req,res)=>{
    const result=await Register.deleteOne({roll:req.params.rollno});
    res.status(200).json({message:"registration delete succesfully"});
};
module.exports={getClubevents,getClubregistrations,eventRegistration,deleteUserregister,updateWinner,updateRunner};