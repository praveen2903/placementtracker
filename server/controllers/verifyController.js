const { StatusCodes } = require("http-status-codes");
const uploadImage = require("../middleware/uploadMiddleware");
const Placed = require("../models/placedModel")
const Register = require('../models/registerModel');
const User = require("../models/userModel");
const { sendMail } = require("../middleware/sendMail");
const getDocs=async(req,res)=>{
    const placdata=await Placed.find({});
    return res.status(StatusCodes.OK).send(placdata);
}
const updateDoc=async(req,res)=>{
    const updateddoc=await Placed.findByIdAndUpdate(req.params.id,{isVerify:true},{new:true});
    console.log("updatedoc",updateddoc);
    return res.send({message:"Verified Succesfully"});
}
const deleteDoc=async(req,res)=>{
    const placed=await Placed.findById(req.params.id);
    const user=await User.findOne({rollno:placed.roll});
    const rollnum=placed.roll;
  
    if (!user) {
        // If no user is found, handle the error
        return res.status(404).send({ message: "User not found" });
      }
      const placemail=user.email;
    const message=`http://localhost:5173/placedverify`;
    await sendMail(placemail,`Your Offer letter verification is rejected by your coordinator please re upload it using the link ${message}`);
    await Placed.findByIdAndDelete(req.params.id);
    return res.send({message:"Offer Letter Rejected"});

}
const uploadDoc=async(req,res)=>{
    const placeddemo=await Register.findOne({roll:req.params.rollno});
    if(!placeddemo){
        return res.json({error:true,message:"you don't have access to upload offer letter"});
    }
    const result=new Placed({
        department:placeddemo.club,
        event:placeddemo.event,
        name:placeddemo.name,
        userimage:placeddemo.userimage,
        year:placeddemo.year,
        roll:placeddemo.roll,
        isVerify:false,
    })
    if (req.file) {
        // Uploading the profile image to AWS S3
        await uploadImage("docs",req.file);
  
        // Setting the cover image URL in the book model
        result.image = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/docs/${req.file.originalname}`;
    }
    const res1=await result.save();
    console.log(res1);
    return res.status(StatusCodes.OK).json({message:"uploaded offer letter succesfully"});
}
module.exports={uploadDoc,getDocs,updateDoc,deleteDoc};