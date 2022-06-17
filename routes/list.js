import express from "express";
import {check} from "../check.js";
import List from "../models/list.js";
const router = express.Router();

//Create
router.post("/lists",check,async (req,res)=>{
    if(req.user.isAdmin){
         try{
            let list =  new List(req.body)
           await list.save()
           res.send(list)
        }catch(err){
             res.send(error)
        }
    }else{ 
        res.send("Not Allowed")
    }
});

//Delete
router.delete("/lists/:id",check,async (req,res)=>{
    if(req.user.isAdmin){
        try{
            let list = await List.findByIdAndDelete(req.params.id);
            res.send("deleted",list)
        }catch(err){ 
            res.send(error)
        }
    }else{ 
        res.send("Not Allowed")
    }
});

//Get

router.get("/search",check, async(req,res)=>{
 
    let type = req.query.type;
    let genre = req.query.genre;
    let list=[];
    try {
        if(type){
            if(genre){
                list = await List.aggregate([
                    {$sample: {size:10}},{$match:{type:type,genre:genre}}]);
            }else{
                list = await List.aggregate([
                                {$sample: {size:10}},{$match:{type:type}}]);
            
            }}else{
                list = await List.aggregate([{$sample: {size:10}}]);
            }
         res.send(list)
        }catch (error) {
        res.send(error)
    }

 
});

export const listrouter = router;