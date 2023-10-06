const mongoose=require('mongoose');
const msgSchema=new mongoose.Schema(
    {
        //parameters into product table
        name:{type:String,required:true},
        email:{type:String,required:true},
        senderroll:{type:String,required:true},
        text:{type:String,required:true},
       
    },{
        timestamps:true,
    }
);
const msg=mongoose.model('msg',msgSchema);//Product is name of table into db
module.exports=msg;