import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './schema.js';
import Feedback from './models/Feedback.js';
import dotenv from 'dotenv';
dotenv.config({path:"./config.env"});

import cookieParser from 'cookie-parser';
import cookiecheck from './cookiecheck.js';

const router = express.Router();
router.use(cookieParser()); // Middleware for cookie parsing.....................................................

router.use(cookieParser()); //middle ware hai taki kabhi bhi ye parser call ho to middle warecall jojaye


router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/register", async (req, res) => {
  const { nickname, username, password } = req.body;

  if (!nickname || !username || !password) {
    return res.status(422).json({ message: "fill all the fields" });
  }

  try {
    const repeat_user = await User.findOne({ username: username });

    if (repeat_user) {
      return res.status(422).json({ message: "username already Exists !!" });
    }

    const new_user = new User({ nickname, username, password });

    await new_user.save();

    const usertoken = await new_user.generateAuthToken();
    console.log(usertoken);
    return res.json({
      token : usertoken,
      message: "User Registered Successfully !!"
    });

    
  } catch (err) {
    console.log(err);
  }
  // console.log(req.body);
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Fill both userid and password !!" });
    }

    const userlogin = await User.findOne({ username: username });

    // if not userid matched then will show error
    if (!userlogin) {
      return res.status(400).json({ error: "Wrong credentials" });
    }

    // comparing for hash value that we created to store in DB for password
    const isMatch = await bcrypt.compare(password, userlogin.password);
    // we are generating jwt token when a user logged in
    const usertoken = await userlogin.generateAuthToken();
    console.log(usertoken);
    
       res.json({
        token : usertoken
      });
  } catch (err) {
    console.log(err);
  }
});

router.post("/feedback", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
    //   .send(newFeedback);
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/search", async (req, res) => {
  const query = req.query.nickname;
  console.log("Recieved", query);
  if (!query) {
    console.log("Name query parameter is missing");
    return res
      .status(400)
      .json({ error: "username query parameter is required" });
  }

  try {
    const users = await User.find({ nickname: new RegExp(query, "i") }); // Case-insensitive search
    console.log("Found users:", users); // Log the results
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/usercokkie', cookiecheck, async (req,res)=>{
  console.log("middle ware call hora");
  res.send(req.rootUser);
  
});

router.get("/sendername/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await User.findOne({ _id: userId });

    if (user) {
      // Respond with the user data if found
      res.json({ username: user.username });
    } else {
      // Respond with a 404 if the user is not found
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle database errors
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
});


// router.get('/logout', async (req,res)=>{
  
//     console.log("User logged out backend call success");
    
//     // Clear the 'pegionJWT' cookie
//     res.clearCookie('pegionJWT');
    
//     // Send a response indicating successful logout
//     res.status(200).json({ message: 'Logout successful' });

// });

export default router;
// kyu export krra hai jbki conn.js me to nhi krna pdra export...... and kb kb export krna pdta h???;
