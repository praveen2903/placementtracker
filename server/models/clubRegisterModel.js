const mongoose=require('mongoose');
const clubRegisterModel=new mongoose.Schema({
    club:{type:String,required:true},
    category:{type:String,required:true},
    name:{type:String,required:true},
    userimage:{type:String},
    year:{type:Number,required:true},
    branch:{type:String,required:true},
    roll:{type:String,required:true,unique:true},
    section:{type:String,required:true},
},{
    timestamps:true,
});
const ClubRegister=mongoose.model('ClubRegister',clubRegisterModel);
module.exports=ClubRegister;