const mongoose=require('mongoose');
const departmentModel=new mongoose.Schema({
    department:{type:String,required:true},
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
const DepartmentRegister=mongoose.model('DepartmentRegister',departmentModel);
module.exports=DepartmentRegister;