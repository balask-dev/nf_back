import jsonwebtoken from "jsonwebtoken";
import express from "express";
const router = express.Router();
 
export function check(req,res){
    const authHeader = req.header.token
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jsonwebtoken.verify(token,process.env.SECRET_KEY,(data,err)=>{
            if(err) req.status(403).send("Token Invalid")
            req.data = data
            next()
        })
    }else res.status(200).send("Authenticated")

}

 