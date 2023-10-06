const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const userSchema=new mongoose.Schema(
    {
        category:{type:String,default:"Student"},
        firstName:{type:String},
        lastName:{type:String},
        rollno:{type:String,required:true,unique:true},
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
        mobile:{type:Number,required:true,unique:true},
        birth: {type:Date, required: true},
        isAdmin:{type:Boolean,default:false,required:true},
    },{
        timestamps:true,
    }
);
const User=mongoose.model('User',userSchema);
module.exports=User;