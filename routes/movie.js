import movieSchema from "../models/movie.js"
import express from "express"
import Movie from "../models/movie.js"
import { check } from "../check.js";
const router = express.Router()


//Create
router.post("/movies",check,async (req,res)=>{
    if(req.user.isAdmin){
        let movie = new Movie(req.body)
        try{
         await movie.save()
         res.send("Saved",movie)
        }catch (error){
            res.send(error)
        }
    }else{
        res.send("Not Allowed")
    }
});

//Update

router.put("/:id",check, async (req,res)=>{
    if(req.user.isAdmin){
        try{
            let updated = await Movie.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
            res.send(updated)
        }
        catch(err){
          res.send(error)
        }
    }else{
        res.send("Not Allowed")
    }
});

// Delete
router.delete("/delete/:id",check,async(req,res)=>{
   if(req.user.isAdmin){
       try{
       await Movie.findByIdAndDelete(req.params.id);
       res.send("Deleted")
       }catch(error){
           res.end(error)
       }
   }else{
       res.send("Not Allowed")
   }
})

//Get One based on type
router.get("/search", check,async (req,res)=>{
    const type = req.query.type; 
     let movie;
if(req.user.isAdmin){
    try{
        if(type === "series"){
            Movie.aggregate([
                {$match:{ isSeries: true}},{$sample:{size:1}}
            ]);
        }else {
            // movie.aggregate([
            //     {$match:{ isSeries: false}},{$sample:{size:1}}
            // ])
            let movie = await Movie.findById(req.params.id)
            res.send(movie)
    }
    }catch(error){
    res.send(error)
   }  
}
else{
     res.send("Not Allowed")
    }

});

// Get 
router.get("/search/:id", check, async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      res.send(movie);
    } catch (err) {
      res.send(err);
    }
  });

// Get All
router.get("/movies", check ,async (req,res) => {
if(req.user.isAdmin){
    try {
        let movies = await Movie.find({})
        res.send(movies)
    } catch (error) {
        res.send(error)
    }
}else{
    res.send("Not Allowed")
}});



export const movieRouter = router;