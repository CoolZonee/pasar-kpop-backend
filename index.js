import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import 'dotenv/config';

import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';

const app = express()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cookieParser())
app.use(cors())

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

const CONNECTION_URL = process.env.MONGODB_CONNECTION_URL
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server runnning on port: ${PORT}`)))
    .catch((error) => console.log(error.message))