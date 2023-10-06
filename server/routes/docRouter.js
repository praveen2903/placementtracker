const express=require("express");
const isAuth=require('../middleware/auth');
const { uploadDoc, getDocs, updateDoc, deleteDoc } = require("../controllers/verifyController");

const router=express.Router();
router.get("/",isAuth,getDocs);
router.post("/:rollno",isAuth,uploadDoc);
router.patch("/update/:id",isAuth,updateDoc);
router.delete("/delete/:id",isAuth,deleteDoc);
// router.post("/send",isAuth,sendChats);
module.exports=router;
