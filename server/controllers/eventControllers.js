const express=require('express');
const Event = require('../models/eventModel');
const expressAsyncHandler = require('express-async-handler');
const Register = require('../models/registerModel');
const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const DepartmentRegister = require('../models/clubRegisterModel');
const { sendMail } = require('../middleware/sendMail');

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
        res.status(StatusCodes.BAD_REQUEST).json({message:"Not Placed changed unsuccesfully"});
        return;
    }
    const newOne=await Register.findOneAndUpdate({roll:rollno},{isRunner:req.body.isRunner},{new:true});
    res.status(StatusCodes.OK).json({message:"Not Placed"});

}
const updateWinner=async(req,res)=>{
    try{
        const rollno=String(req.params.roll);
        const exist=await Register.findOne({roll:rollno});
        if(exist.isRunner){
            res.status(StatusCodes.BAD_REQUEST).json({message:"Placed changed unsuccesfully"});
            return;
        }
        const newOne=await Register.findOneAndUpdate({roll:rollno},{isWinner:req.body.isWinner},{new:true});
        const user=await User.findOne({rollno:rollno});
        const message=`http://localhost:5173/placedverify`;

        await sendMail(user.email,`Please upload your offer letter In the Placement Hub Portal with this url ${message} by login into the portal`);
        console.log(newOne);
        res.status(StatusCodes.OK).json({message:"Placed Status Succesfully"});
    }catch(err){
        console.log(err);
    }
}

const eventRegistration=(expressAsyncHandler(async(req,res)=>{
    console.log("event",req.body.data);
    const{user,club,event,category,username,image,year,branch,rollno,cgpa}=req.body.data;
    try{
        //Here first we are checking user registers list and after check club registartion for event register.
            const rollnum = await Register.findOne({ roll: rollno });
            // if (rollnum) {
            // res.json({ error:true,message: `You already registered for ${rollnum.event} event` });
            // return;
            // }
            const ev=await Event.findOne({eventname:event});
            const messageurl=ev.companyurl;
            console.log("event",ev);
            const gpa=await ev.cgpa;
            if(cgpa<gpa){
                return res.json({error:true,message:"You don't have required cgpa for this job profile"});
            }
            const reg=await DepartmentRegister.findOne({roll:rollno,club:club});
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
            isWinner:false,
            isRunner:false,
        });
        await sendMail(user,messageurl);
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