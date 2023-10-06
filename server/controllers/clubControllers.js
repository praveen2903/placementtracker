const { StatusCodes } = require('http-status-codes');
const DepartmentRegister=require("../models/clubRegisterModel")
const Clubs=require('../models/clubsModel');
const User=require('../models/userModel');
const express=require('express');
const clubRouter=express.Router();
const getClubs=async(req,res)=>{
    const clubs=await Clubs.find({});
    res.send(clubs);
};
const getClubRegisters=async(req,res)=>{
    const registers=await DepartmentRegister.find({});
    return res.status(StatusCodes.OK).send(registers);
}
const updateUserregister=async(req,res)=>{
    const rollno=String(req.params.roll);
    console.log("rollno",req.params.roll);
    const newOne=await DepartmentRegister.findOneAndUpdate({roll:rollno},{category:req.body.category},{new:true})
    const newUser=await User.findOneAndUpdate({rollno:rollno},{category:req.body.category},{new:true})
    console.log("newone",newOne);
    console.log("newone",newUser);
    res.status(StatusCodes.OK).json({message:"Coordination changed succesfully"});
};
const clubRegister=async(req,res)=>{
    const {clubname,image,category,username,branch,year,rollno}=req.body.data
    console.log(req.body.data);
    const res1=await DepartmentRegister.findOne({roll:rollno});
    if(res1){
        console.log(res1);
        return res.json({error: true,message:`You registered for ${res1.club} department`});
    }
    const result=await DepartmentRegister({
        club:clubname,
        category:category,
        name:username,
        userimage:image,
        year:year,
        branch:branch,
        roll:rollno,
    });
    await result.save();
    return res.status(StatusCodes.OK).json({message:"Department Registration succesfully"});
}
const getChooseclub=async(req,res)=>{
    const club=await Clubs.findOne({name:req.params.name});
    if(club){
        res.send(club);
    }
    else{
        res.status(404).send({message:'Product not Found'});
    }
};

module.exports={getChooseclub,getClubs,clubRegister,getClubRegisters,updateUserregister};