import express from "express";
import {signUp,signIn} from "../Controller/AuthController.js";


const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);

export {router as authRouter}
