const mongoose=require('mongoose');
const eventModel=new mongoose.Schema({
    clubname:{type:String,required:true},
    eventname:{type:String,required:true},
    eventdate: {
        type:Date,
        required: true, // Make eventdate required
    },
    
    eventimage:{type:String,default:"https://clubs-bucket.s3.ap-south-1.amazonaws.com/event.jpg"},
    description:{type:String},
    cgpa:{type:Number,required:true},
    companyurl:{type:String,required:true},
},{
    timestamps:true,
});
const Event=mongoose.model('Event',eventModel);
module.exports=Event;