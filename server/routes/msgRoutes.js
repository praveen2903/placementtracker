const express=require("express");
const router = express.Router();
const { getMessages, getUsermsg, sendMsg, deleteMessages } = require("../controllers/msgController.js");
const isAuth=require('../middleware/auth');

router.get("/messages",isAuth,getMessages);
router.get('/:rollno',getUsermsg);
router.post('/send',sendMsg);
router.delete("/remove/:id",isAuth,deleteMessages);

module.exports=router;