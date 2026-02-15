require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
const PORT = Number(process.env.PORT) || 8081;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lab4_users_database";

app.use(express.json());

app.post("/users", async (req, res) => {
  try {
    const createdUser = await User.create(req.body);
    return res.status(201).json({
      message: "User created successfully",
      data: createdUser,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const details = {};
      Object.keys(error.errors).forEach((field) => {
        details[field] = error.errors[field].message;
      });

      return res.status(400).json({
        message: "Validation failed",
        errors: details,
      });
    }

    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({
        message: "Validation failed",
        errors: { email: "Email must be unique" },
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

app.use((_req, res) => {
  return res.status(404).json({ message: "Route not found" });
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
}

startServer();
