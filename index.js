import mongoose  from "mongoose";
import express from "express";
import {authRouter}from "./routes/auth.js";
import {userRouter } from "./routes/user.js";
import {movieRouter} from "./routes/movie.js";
import {listrouter} from "./routes/list.js";
import dotenv from "dotenv"
const app = express()
app.use(express.json())
dotenv.config()

//Connection
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true},()=> console.log("Connected"))

//Routes
app.use("/api/auth",authRouter)
app.use("/api/users",userRouter)
app.use("/api/movies",movieRouter)
app.use("/api/lists",listrouter)


app.listen(process.env.PORT)