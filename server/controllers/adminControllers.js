const express=require('express');
const User=require('../models/userModel');
const expressAsyncHandler=require('express-async-handler');
const Clubs=require('../models/clubsModel');
const bcrypt=require('bcryptjs');
const Event = require('../models/eventModel');
const data = require('../data');
const dotenv=require('dotenv');
const uploadImage = require('../middleware/uploadMiddleware');
const StatusCodes=require('http-status-codes');
const Register = require('../models/registerModel');
const Testimony=require("../models/testimonialModel");
const moment = require('moment-timezone'); // Import moment-timezone

dotenv.config();
const getDetails=async(req,res)=>{
    await User.deleteMany({});
    const createdUser=await User.create(data.users);
    
    res.send({createdUser});
};

const addEvent=(expressAsyncHandler(async(req,res)=>{
    // const correctdate = moment(req.body.eventdate).utc().toDate(); it is when I am in localhost
    // const correctdate =event.eventDate.subtract(5, 'hour').toDate();;
    const events=new Event({
        clubname:req.body.club,
        eventname:req.body.name,
        eventdate:req.body.eventdate,  
        description:req.body.desc,
        cgpa:req.body.cgpa,
        companyurl:req.body.companyurl,
    });
    if (req.file) {
        // Uploading the profile image to AWS S3
        await uploadImage("events",req.file);
  
        // Setting the cover image URL in the book model
        events.eventimage = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/events/${req.file.originalname}`;
      }
    
    const event=await events.save();
    console.log(event);
    res.status(200).json({message:"add Event succesfully"});

}));

const deleteEvent=(expressAsyncHandler(async(req,res)=>{
    const event=await Event.findById(req.params.id);
    await Register.deleteMany({event:event.eventname});
    await Event.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({message:"event delete succesfully"});
}))

const updateEvent=(expressAsyncHandler(async(req,res)=>{
    const {id}=req.body;
    const eve=await Event.findById(id);
    const newReg=await Register.find({event:eve.eventname});
    console.log("new Reg",newReg);
    if(newReg.length>0){
        for(const reg of newReg){
            const updateReg=await Register.findByIdAndUpdate(reg._id,{club:req.body.club,event:req.body.name});
            await updateReg.save();
        }
    }
    const newOne=await Event.findByIdAndUpdate(id,{clubname:req.body.club,eventname:req.body.name,eventdate:req.body.eventdate,description:req.body.desc});
    if(req.file){
        await uploadImage("events",req.file);
        newOne.eventimage= `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/events/${req.file.originalname}`;
    }else{
        newOne.image=req.body.image;
    }
    await newOne.save();
    console.log(newOne);
    return res.status(StatusCodes.OK).json({message:"company updated succesfully"});
}))

const updateClub=(expressAsyncHandler(async(req,res)=>{
    const {id}=req.body;
    const newOne=await Clubs.findByIdAndUpdate(id,{name:req.body.name,desc:req.body.desc},{new:true});
    if(req.file){
        await uploadImage("clubs",req.file);
        newOne.image = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/clubs/${req.file.originalname}`;
    }else{
        newOne.image=req.body.image;
    }
    newOne.save();
    console.log("newOne",newOne);
    return res.status(StatusCodes.OK).json({message:"Department update succesfully"});
}))
// const addTestimony=(expressAsyncHandler(async(req,res)=>{
//     console.log("profileData",req.body);
//     const {name,position,desc}=req.body;
//     const testimonial=new Testimony({
//         name:name,
//         position:position,
//         desc:desc,
//     });
//     if(req.file){
//         await uploadImage("admins",req.file);
//         testimonial.profile=`https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/admins/${req.file.originalname}`;
//     }
//     const test1=await testimonial.save();
//     console.log(test1);
//     return res.status(StatusCodes.OK).json({message:"Testimonial added succesfully"});
// }));
const addClub=(expressAsyncHandler(async(req,res)=>{
    const clubs=new Clubs({
        name:req.body.name,
        desc:req.body.desc,
    });
    if (req.file) {
        // Uploading the profile image to AWS S3
        await uploadImage("clubs",req.file);
  
        // Setting the cover image URL in the book model
        clubs.image = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/clubs/${req.file.originalname}`;
    }
    const res1=await clubs.save();
    console.log(res1);
    return res.status(StatusCodes.OK).json({message:"Department added succesfully"});
}));
const addTestimony=(expressAsyncHandler(async(req,res)=>{
    const testimonial=new Testimony({
        name:req.body.name,
        position:req.body.position,
        desc:req.body.desc,
    })
    if(req.file){
        await uploadImage("admins",req.file);
        testimonial.image=`https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/admins/${req.file.originalname}`;
    }
    const res1=await testimonial.save();
    console.log(res1);
    return res.status(StatusCodes.OK).json({message:"Testimonial added succesfully"});

})) 



const deleteClub=async(req,res)=>{
    console.log("delete id",req.params.id);
    const club=await Clubs.findById(req.params.id);
    await Register.deleteMany({club:club.name});
    await Event.deleteMany({clubname:club.name});
    const result=await Clubs.findByIdAndDelete(req.params.id);
    res.json({message:"Club deleted succesfully"});
};

// const addCoordinator=(expressAsyncHandler(async(req,res)=>{
//     const {roll}=req.body;
//     const existingRegister=await Register.findOne({roll})
//     if(existingRegister){
//         const updatedUser=await Register.findOneAndUpdate({roll},{category:"Coordinator"},{new:true});
//         console.log(updatedUser);
//         return res.status(StatusCodes.OK).json({message:"Registered User updated as Coordinator"});
//     }return res.status(StatusCodes.BAD_REQUEST).json({message:"User Not regisered"});
// }))
const addAdmin=(expressAsyncHandler(async(req,res)=>{
    const{category,firstname,lastname,email,password,year,birth,branch,mobileno,admin,rollno}=req.body;
    console.log("admin",admin);
    const existingUser=await User.findOne({email})
    if(existingUser){
        const updateUser = await User.findOneAndUpdate({ email }, { isAdmin: true }, { new: true });
        console.log(updateUser);
        return res.status(StatusCodes.OK).json({message:"Existing user updated as admin"});
    }
    const newUser=new User({
        category:category,
        firstName:firstname,
        lastName:lastname,
        rollno:rollno,
        email:email,
        password:bcrypt.hashSync(password),
        branch:branch,
        year:year,
        birth:birth,
        mobile:mobileno,
        isAdmin:admin,
       });
       if(req.file){
           await uploadImage("users",req.file);
           newUser.image = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/users/${req.file.originalname}`;
       }
       const token=generateToken(newUser);
       const user=await newUser.save();
        return res.status(StatusCodes.CREATED).json({message:"admin added succesfully"});
}))
module.exports={getDetails,addEvent,addClub,addAdmin,updateClub,updateEvent,deleteClub,deleteEvent,addTestimony};