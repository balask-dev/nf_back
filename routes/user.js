import express from "express";
import cryptoJs from "crypto-js";
import dotenv from "dotenv"
import {check} from "../check.js";
import User  from "../models/user.js";
const router = express.Router()
dotenv.config()
 

//Update
router.put("/:id",check,async(req,res)=>{
 if(req.user.id === req.params.id || req.user.isAdmin){
   if(req.body.password){
    req.body.password = cryptoJs.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY).toString()
   }
   try{
   const updated = User.findByIdAndUpdate( req.params.id ,{$set:req.body},{new:true});
   res.send(updated)
   }catch (err){
      res.send(err)
  } }else{
   res.send("updated only")
  
  }


})

//Delete

router.delete("/:id",async(req,res)=>{
 if(req.user.id === req.params.id || req.user.isAdmin){
   await findByIdAndDelete(req.params.id)
   .then((data)=> res.send("Deleted",data))
   .catch((err)=> res.send(err))
 }else{
   res.status(403).send("Invalid user")
 }

 //Get

 router.get("/:id", check,async(req,res)=>{
   try{
   let user  = await findById(req.params.id)
   const { password, ...info } = user._doc;
   res.status(200).send(data,info)
   }catch(err){ res.send(err)}
 })

})

//GetAll
router.get("/allusers",check,async(req,res)=>{
  let query = req.query.new
  if(req.user.isAdmin){
    try{
          let users = query ? await user.find().sort({_id:-1}).limit(10): await user.find({})
          res.status(200).send(users)
  } catch(error){ 
    res.send(error)
  }
}else {
  res.send("Your Not Allowed To Here")
}
});


//Stats
router.get("/stats",async(req,res)=>{
  let today = new Date();
  let latYear = today.setFullYear(todat.setFullYear()-1)
  try{
  const data = await user.aggregate([
    {
      $project:{ month:{$month:"$createdAt"}}},{
      $group:{ _id:"$month",total:{$sum:1}}
    }]);

  res.status(200).send(data)
} 
catch(err){
  res.send(error)
}
});
  

export const userRouter  = router;