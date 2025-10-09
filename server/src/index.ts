import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import authRouter from "./router/auth.js"
import dotenv from "dotenv"
dotenv.config()
const app = express()
app.use(cors({
    origin:['http://localhost:5173'],
    methods:'GET,PUT,POST,DELETE',
    credentials:true
}))
app.use(express.json())
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL ?? "mongodb+srv://codewithbihari:codebihari9199@cluster0.vrkl8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("connected")
  } catch (error) {
    console.log(error)
  }
}
main()


app.use("/api/v1", authRouter)
app.get("/", (req, res) => {
  res.send("✅ Server is running successfully!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})