import express from "express"
import {connection} from './config/database.js';

const app = express();
const PORT = 3000;

connection();
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
});