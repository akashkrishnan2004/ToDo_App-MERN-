import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./connection.js";
import rourter from "./routes/route.js";


const app = express();
dotenv.config();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api", rourter)

connectDb();

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server started on port ${PORT}`);
  }
});
