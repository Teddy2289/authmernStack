import {User} from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import {errorHandler} from "../utils/errorHanlder.js";
import jwt from "jsonwebtoken"

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
        res.status(201).json({message: "User created successfully", data: newUser});
    } catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error code
            const field = Object.keys(error.keyPattern)[0];
            res.status(409).json({message: `Duplicate key error: ${field} already exists`});
        } else {
            next(error);
        }
    }
};

export const signIn = async (req, res, next) => {
    const {email, password} = req.body
    try {
        const usersExist = await User.findOne({email});
        if (!usersExist) return next(errorHandler(404, "User not found"));
        const validPassword = bcrypt.compareSync(password, usersExist.password);
        if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
        const token = jwt.sign({id: usersExist._id}, process.env.JWT_SECRET);
        //enlever le password sur le retour response
        const {password: hashedPassword, ...rest} = usersExist._doc;
        const expiresToken = new Date(Date.now() + 3600000);// 1 hour
        res.cookie('access_token', token, {"httpOnly": true, expires: expiresToken}).status(200).json(rest);
    } catch (e) {
        next(e);
    }
}