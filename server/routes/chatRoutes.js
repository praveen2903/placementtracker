const express=require("express");
const isAuth=require('../middleware/auth');
const { getChats, updateChats} = require("../controllers/chatController");

const router=express.Router();
router.get("/",isAuth,getChats);
router.patch("/:id",updateChats);
// router.post("/send",isAuth,sendChats);
module.exports=router;
