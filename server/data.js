const bcrypt=require('bcryptjs');
const data={
    users:[
        {
            category:'Faculty',
            username:'Prakash',
            email:'20bq1a05j5@vvit.net',
            password:bcrypt.hashSync('nanna143'),
            image:"https://clubs-bucket.s3.ap-south-1.amazonaws.com/nature.jpg",
            branch:'CSE',
            year:4,
            section:'D',
            rollno:'20bq1a05j5',
            isAdmin:true,
        },
    ]
}
module.exports=data;