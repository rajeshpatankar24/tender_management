import "../model/connection.js";
import jwt from 'jsonwebtoken';
import rs from 'randomstring';
import UserSchemaModel from '../model/user.model.js';
import bcrypt from 'bcryptjs'
import senMail from "./email.controller.js";


export const save = async (req, res) => {
  console.log("Registration payload:", req.body);
  try {
    // For dynamic id increment: safely get the highest existing _id
    const lastUser = await UserSchemaModel.findOne().sort({ _id: -1 });
    const _id = lastUser && typeof lastUser._id === 'number' ? lastUser._id + 1 : 1;

    const userRole = req.body.role || "user";
    const rawEmail = req.body.email ? req.body.email.toLowerCase().trim() : "";
    const userDetails = {
      role: userRole,
      ...req.body,
      email: rawEmail,
      _id: _id,
      status: 1,
      info: Date()
    };

    const password = userDetails.password;
    if (!password) {
      return res.status(400).json({ status: false, message: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    userDetails.password = hashedPassword;

    await UserSchemaModel.create(userDetails);

    // Attempt to send email without letting mail errors block registration
    try {
      senMail(rawEmail, password);
    } catch (mailErr) {
      console.error("Failed to send welcome email:", mailErr);
    }

    res.status(200).json({ status: true, message: "Registration successful" });
  } catch (error) {
    console.error("User registration error:", error);
    if (error.code === 11000) {
      return res.status(400).json({ status: false, message: "This email address is already registered." });
    }
    if (error.name === 'ValidationError' && error.errors) {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ status: false, message: messages.join(', ') });
    }
    res.status(500).json({ status: false, message: error.message || "Failed to register user. Internal server error." });
  }
};

export const login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const inputEmail = req.body.email.toLowerCase().trim();
    console.log("Login attempt for:", inputEmail);
    
    // Find user by email first
    var userList = await UserSchemaModel.find({ email: inputEmail });

    if (userList.length !== 0) {
      const user = userList[0];
      
      // Check if user status is active
      if (user.status === 0) {
        return res.status(403).json({ message: "Account is pending email verification. Please verify your email before logging in." });
      }

      // Compare password with hashed password
      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (isMatch) {
        const payload = user.email; // get email from user list
        const key = rs.generate(50); // generate random key
        const token = jwt.sign(payload, key); // sign token with key
        res.status(200).json({ token: token, userdetails: user }); // token and user details
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error during login" });
  }
};

export const fetch = async (req, res) => {
  try {
    let condition_obj = {};
    if (req.query.condition_obj) {
      try {
        condition_obj = typeof req.query.condition_obj === 'string'
          ? JSON.parse(req.query.condition_obj)
          : req.query.condition_obj;
      } catch (e) {
        condition_obj = req.query;
      }
    } else {
      condition_obj = req.query;
    }

    var userList = await UserSchemaModel.find(condition_obj);
    if (userList.length !== 0) {
      res.status(200).json(userList);
    } else {
      res.status(404).json("Resource not found");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json("Server error");
  }
};

export const updateData = async (req, res) => {
  try {
    let userDetails = await UserSchemaModel.findOne(req.body.condition_obj);
    if (userDetails) {
      let user = await UserSchemaModel.updateOne((req.body.condition_obj), { $set: req.body.content_obj });
      if (user)
        res.status(200).json("Success");
      else
        res.status(500).json("Server error");
    }
    else
      res.status(404).json({ "status": "Resource is not found " });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json("Server error");
  }
};

export const deleteUser = async (req, res) => {
  try {
    let uDetails = await UserSchemaModel.findOne((req.body));

    if (uDetails) {
      let user = await UserSchemaModel.deleteOne((req.body));
      if (user)
        res.status(200).json("success");
      else
        res.status(500).json("Server error");
    }
    else
      res.status(404).json("Resource is not found");
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json("Server error");
  }
};