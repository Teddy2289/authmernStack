// routes/users.route.js
import express from "express";
import { getUser } from "../Controller/UserController.js";

const router = express.Router();

router.get('/', getUser);

export { router as userRouter };
