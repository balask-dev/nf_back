import express from "express";
import cryptoJS from "crypto-js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
const router = express.Router();

// async function genPassword(password) {
//   const salt = await bcrypt.genSalt(10);
//   let hashed = await bcrypt.hash(password, salt);
//   return hashed;
// }
//Register
// router.post("/register", async (req, res) => {
//   const { username } = req.body;
//   const hashed = await genPassword(req.body.password);
//   const user1 = new user({
//     username: username,
//     email: req.body.email,
//     password: hashed,
//   });
//   await user1
//     .save()
//     .then((data) => res.send(data))
//     .catch((error) => console.log(error));
// });

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   console.log(username, password);
//   let data = await user.findOne({ username: username });
//   const hpassword = data.password;
//   if (!data) {
//     res.send({ message: "Invalid credentials" });
//   } else {
//     console.log(hpassword);
//     console.log(password);
//     const key = await bcrypt.compare(hpassword, password);
//     console.log(key);
//     if (key) res.send({ message: "loggedIn" });
//     else res.send({ message: "Invalid credentials" });
//   }
// });

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

export const authRouter = router;
