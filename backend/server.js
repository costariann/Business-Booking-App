import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import cors from 'cors';
import businessRouter from './routes/businessRoutes.js';

dotenv.config();

const db = process.env.MONGODB_URI;

mongoose.connect(db).then(() => {
  console.log('connected to database');
});

const app = express();

app.use(
  cors({
    origin: '*',
  })
);

//convert data to json inside the req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
app.use('/api/businesses', businessRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server connected at http://localhost:${port}`);
});
