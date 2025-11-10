import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
// import { getGeminiResponse } from "./utils/gemini.js";
import mongoose from 'mongoose';
import chatRoutes from './routes/chat.js';

const app = express();
const PORT = 8080;

dotenv.config();

app.use(express.json());
app.use(cors());

const connectDB = async() =>{
  try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected");
  }catch(err){
    console.log("fail to connect with db");
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

//function
// async function testGemini() {
//   try {
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     const result = await model.generateContent("Say hello Gemini!");
//     console.log("Gemini API is working!");
//     console.log("Response:", result.response.text());
//   } catch (error) {
//     console.error("Error connecting to Gemini API:", error.message);
//   }
// }

// testGemini();



// app.post("/api/chat", async (req, res) => {
//   try {
//     const { message, history } = req.body;
//     const reply = await getGeminiResponse(message, history);
//     res.json({ reply });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Gemini API call failed" });
//   }   
// });

app.use("/api", chatRoutes);