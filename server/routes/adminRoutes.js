const express=require("express");
const router = express.Router();
const {getDetails,addClub,addEvent, addAdmin,updateClub, updateEvent, deleteEvent, deleteClub, addTestimony}=require("../controllers/adminControllers.js");
const isAuth=require('../middleware/auth');

router.get("/",isAuth,getDetails);
router.post("/addAdmin",isAuth,addAdmin);
router.post("/addEvent",isAuth,addEvent);
router.delete('/deleteClub/:id',isAuth,deleteClub);
router.patch("/updateEvent",isAuth,updateEvent);
router.post("/addClub",isAuth,addClub);
router.delete('/deleteEvent/:id',isAuth,deleteEvent);
router.post("/addTestimonial",isAuth,addTestimony);
router.patch("/updateClub",isAuth,updateClub);

module.exports=router;