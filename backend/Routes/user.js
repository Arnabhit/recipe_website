const express= require('express');

const {handleUserSignup}=require("../Controllers/user");
const {handleUserSignin} =require("../Controllers/user")
const router=express.Router();
router.post("/signup",handleUserSignup)
router.post("/signin",handleUserSignin)
module.exports=router;
