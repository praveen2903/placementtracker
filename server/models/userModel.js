const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const validator=require('validator');
const userSchema=new mongoose.Schema(
    {
        category:{type:String,default:"Student"},
        username:{type:String,required:true},
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase:true,
        },        
        password:{type:String,required:true},
        image:{type: String,
            default:
              "https://booktalks.s3.ap-south-1.amazonaws.com/istockphoto-1305665241-1024x1024.jpg",
        },
        branch:{type:String,required:true},
        year:{type:Number,required:true},
        section:{type:String,required:true},
        rollno:{type:String,required:true,unique:true},
        isAdmin:{type:Boolean,default:false,required:true},
    },{
        timestamps:true,
    }
);
const User=mongoose.model('User',userSchema);
module.exports=User;