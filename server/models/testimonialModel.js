const mongoose=require('mongoose');
const testimonialModel=new mongoose.Schema(
    {
        name:{type:String,required:true,unique:true},
        position:{type:String,required:true,unique:true},
        profile:{type: String,
            default:
              "https://booktalks.s3.ap-south-1.amazonaws.com/istockphoto-1305665241-1024x1024.jpg",
        },
        desc:{type:String,required:true},
    },{
        timestamps:true,
    }
);
const Testimony=mongoose.model('Testimony',testimonialModel);
module.exports=Testimony;