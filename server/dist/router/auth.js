import express from "express";
import User from "../db/Auth.js";
import jwt from "jsonwebtoken";
import { userMiddleware } from "../middleware.js";
import Content from "../db/Content.js";
const router = express.Router();
const jwt_password = "your_jwt_secret_key";
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username, password: password });
    if (user) {
        const token = jwt.sign({
            id: user._id
        }, jwt_password);
        res.status(200).json({
            message: "Login successful",
            token: token
        });
    }
    else {
        res.status(400).json({
            message: "Invalid credentials"
        });
    }
});
router.post("/register", async (req, res) => {
    const { username, password, email } = req.body;
    const user = await User.create({
        username: username,
        password: password,
        email: email
    });
    if (user) {
        res.status(200).json({
            message: "User registered successfully",
            user: user
        });
    }
    else {
        res.status(400).json({
            message: "User registration failed"
        });
    }
});
router.post("/content", userMiddleware, async (req, res) => {
    const { link, type, title } = req.body;
    const content = await Content.create({
        link,
        type,
        title,
        userId: req.userId,
        tags: []
    });
    if (content) {
        res.status(200).json({ content });
    }
    else {
        return res.json("failed creation");
    }
});
router.get("/content", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const contentall = await Content.find({ userId: userId }).populate("userId", "username email");
    res.json({ contentall });
});
router.delete("/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    const deletes = await Content.deleteMany({
        contentId,
        userId: req.userId
    });
    if (deletes) {
        res.status(200).json({ message: "Content deleted successfully" });
    }
});
// router.post("/brain/share", (req, res) => {
// });
export default router;
//# sourceMappingURL=auth.js.map