const mongoose=require('mongoose');
const registerModel=new mongoose.Schema({
    club:{type:String,required:true},
    event:{type:String,required:true},
    category:{type:String,required:true},
    name:{type:String,required:true},
    userimage:{type:String},
    year:{type:Number,required:true},
    branch:{type:String,required:true},
    roll:{type:String,required:true},
    isWinner:{type:Boolean,required:true},
    isRunner:{type:Boolean,required:true},
},{
    timestamps:true,
});
const Register=mongoose.model('Register',registerModel);
module.exports=Register;