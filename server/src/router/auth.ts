import express from "express";
import User from "../db/Auth.js";
import jwt from "jsonwebtoken"
import { userMiddleware } from "../middleware.js";
import Content from "../db/Content.js";
import Link from "../db/Link.js";
import { random } from "../utility.js";
import dotenv from "dotenv"
dotenv.config()
const router = express.Router();

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email, password: password});
    if(user){
        const token = jwt.sign({
            id: user._id
        }, process.env.jwt_password ?? "your_jwt_secret_key");
        res.status(200).json({
            message: "Login successful",
            token: token
        });
    }else{
        res.status(400).json({
            message: "Invalid credentials"
        });
    }
});
router.post("/register", async(req, res) => {
 const {username,password,email}=req.body;
 const user=await User.create({
    username:username,
    password:password,
    email:email
 })
 if(user){
    res.status(200).json({
        message:"User registered successfully",
        user:user
    })
 }else{
    res.status(400).json({
        message:"User registration failed"
    })
 }
});
router.post("/content",userMiddleware, async(req, res) => {
    const {link,type,title}=req.body;
    const content=await Content.create({
        link,
        type,
        title,
        userId:req.userId,
        tags:[]
    })
    if(content){
       res.status(200).json({content})
    }else{
        return res.json(
            "failed creation"
        )
    }

})
router.get("/content",userMiddleware, async(req, res) => {
    const userId=req.userId;
   const contentall=await Content.find({userId:userId}).populate("userId","username email")
   res.json({contentall})
});

router.delete("/content",userMiddleware, async(req, res) => {
    const contentId=req.body.contentId;
    const deletes=await Content.deleteMany({
        _id:contentId,
        userId:req.userId
    })
    if (deletes) {
        res.status(200).json({ message: "Content deleted successfully" });
    }
});
router.post("/brain/share",userMiddleware,async (req, res) => {
    const {share}=req.body;
    if(share){
       const Hash=await Link.create({
        userId:req.userId,
        hash:random(10)
       })
      return res.json(Hash);
    }else{
       await Link.deleteOne({userId:req.userId})
    }
    
});

router.get("/brain/:sharelink",userMiddleware,async(req,res)=>{
    const hash=req.params.sharelink;
    const link=await Link.findOne({
        hash
    })
    if (!link) {
        res.status(411).json("Incorrect message")
        return;
    }

        const content=await Content.find({userId:link.userId})
        const user=await User.findOne({
            _id:link.userId
        })
        if (!user) {
            res.status(411).json({
                message:"User not found, error should be happen"
            })
            return
        }

        res.json({
            // link:link,
            username:user.username,
            content:content
        })
    
})

export default router;