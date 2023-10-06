const express=require('express');
const { getClubs, getChooseclub, clubRegister, getClubRegisters, updateUserregister} = require('../controllers/clubControllers');
const isAuth = require('../middleware/auth');
const router=express.Router();

router.get('/',getClubs);
router.post('/register',isAuth,clubRegister);
router.get('/registers/all',getClubRegisters);
router.patch('/registers/update/:roll',isAuth,updateUserregister);
router.get('/name/:name',getChooseclub);
module.exports=router;