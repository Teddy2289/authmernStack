import express from "express";
import {signUp} from "../Controller/AuthController.js";


const router = express.Router();

router.post('/', signUp);

export {router as authRouter}
