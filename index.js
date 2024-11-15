import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import dbConnect from "./config/database.js";
import router from "./routes/feedbackRoutes.js";

const app = express();
dotenv.config();

const PORT = 3030;

// Middleware to parse JSON
app.use(express.json());

app.use("/api/v1",router)

// Connect to the database
dbConnect();

// Define the route with `req` and `res` as parameters



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});
