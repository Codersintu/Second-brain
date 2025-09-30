import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import authRouter from "./router/auth.js";
const app = express();
app.use(express.json());
async function main() {
    await mongoose.connect("mongodb+srv://codewithbihari:codebihari9199@cluster0.vrkl8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Database connected");
}
main();
app.use("/api/v1", authRouter);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=index.js.map