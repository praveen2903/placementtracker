const express=require("express");
const router = express.Router();
const getUsers = require("../controllers/userControllers.js");

router.get("/:rollno",getUsers);


module.exports=router;