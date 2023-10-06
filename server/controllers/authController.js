const express=require('express');
const User=require('../models/userModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const { generateToken }=require('../middleware/utils');
const expressAsyncHandler=require('express-async-handler');
const uploadImage = require('../middleware/uploadMiddleware');
const userRoutes=express.Router();
const dotenv=require('dotenv');
const { StatusCodes } = require('http-status-codes');
const { sendMail } = require('../middleware/sendMail');
dotenv.config();
userRoutes.get('/:rollno',async(req,res)=>{
    const result=await User.find({rollno:req.params.rollno});
    res.send(result);
});
const profile=(expressAsyncHandler(async(req,res)=>{
    const {id}=req.body;
    const{name,email,branch,rollno,section,year}=req.body;
    const newOne=await User.findByIdAndUpdate(id,{username:name,email:email,branch:branch,rollno:rollno,section:section,year:year});
    if(req.file){
        await uploadImage("profiles",req.file);
        newOne.image= `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/profiles/${req.file.originalname}`;
    }else{
        newOne.image=req.body.image;
    }
    newOne.save();
    console.log(newOne);
    return res.status(StatusCodes.OK).json({user:newOne,message:"Profile Update Succesfully"});
}))
const resetPassword=(expressAsyncHandler(async(req,res)=>{
    const {id,token}=req.params;
    const {password}=req.body;
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Error with token"});
        }
    })
    const hash=bcrypt.hashSync(password);
    console.log("hash",hash);
    await User.findByIdAndUpdate(id,{password:hash});
    return res.status(StatusCodes.OK).json({message:"password updated succesfully..."});

}))
const forgotPassword=(expressAsyncHandler(async(req,res)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return res.status(StatusCodes.NOT_FOUND).json({message:"User Not Exist"});
    }    
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
    const message=`http://localhost:5173/reset-password/${user._id}/${token}`;
    await sendMail(user.email,message);
    return res.status(StatusCodes.OK).json({message:"mail sent succesfully"});
}));

const login=(expressAsyncHandler(async(req,res)=>{
    const user=await User.findOne({email:req.body.data.email});
    if(user){
        if(bcrypt.compareSync(req.body.data.password,user.password)){
            const token=generateToken(user);
            res
            .status(201)
            .json({token, user});
            return ;
        }
    }
    res.status(401).send({message:'invalid Password or Email'});
    
}));
const signup=(expressAsyncHandler(async(req,res)=>{
    const{category,firstname,lastname,email,password,year,birth,branch,mobileno,admin,rollno}=req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
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
    res
      .status(201)
      .json({token, user});
}));
module.exports = {login,signup,profile,forgotPassword,resetPassword};