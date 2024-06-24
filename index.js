import express from "express"
import {connection} from './config/database.js';
import {userRouter} from './routes/users.route.js'
import {authRouter} from './routes/auth.route.js'
import {errorMiddleware} from "./Middleware/ErrorMiddleware.js";
const app = express();

app.use(express.json());
app.use('/api/users',userRouter);
app.use('/api/signup',authRouter);
app.use(errorMiddleware);
const PORT = 3000;


connection();
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
});