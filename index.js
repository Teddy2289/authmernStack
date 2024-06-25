import express from "express"
import {connection} from './config/database.js';
import {userRouter} from './routes/users.route.js'
import {authRouter} from './routes/auth.route.js'
import {errorMiddleware} from "./Middleware/ErrorMiddleware.js";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/users',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/auth',authRouter);
app.use(errorMiddleware);
const PORT = process.env.PORT || 5000;


connection();
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
});