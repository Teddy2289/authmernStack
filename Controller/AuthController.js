import {User} from "../Models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res, next) => {
    const {username, email, password} = req.body;
    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({message: "Username, email, and password are required"});
    }
    // Hash the password
    let hashedPassword;
    try {
        hashedPassword = bcrypt.hashSync(password, 10);
    } catch (error) {
        return next(error);
    }
    // Create new user
    const newUser = new User({username, email, password: hashedPassword});
    try {
        await newUser.save();
        res.status(201).json({ message: "User created successfully", data: newUser });
    } catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error code
            const field = Object.keys(error.keyPattern)[0];
            res.status(409).json({ message: `Duplicate key error: ${field} already exists` });
        } else {
            next(error);
        }
    }
};