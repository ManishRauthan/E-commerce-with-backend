import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Model/User.js";

const router = express.Router();

// POST /auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// ✅ POST /auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, "secretkey", {
      expiresIn: "1h",
    });
    res.status(200).json({
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
