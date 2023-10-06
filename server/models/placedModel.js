const mongoose=require('mongoose');
const placedModel=new mongoose.Schema({
    department:{type:String,required:true},
    event:{type:String,required:true},
    image:{type:String,required:true},
    name:{type:String,required:true},
    userimage:{type:String},
    year:{type:Number,required:true},
    roll:{type:String,required:true},
    isVerify:{type:Boolean,required:true},
},{
    timestamps:true,
});
const Placed=mongoose.model('Placed',placedModel);
module.exports=Placed;