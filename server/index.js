import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// API Routes
import userRoutes from './routes/user.route.js';

const run = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@small-blog.1wwj7up.mongodb.net/?retryWrites=true&w=majority`
  );
  console.log('MongoBD is Connected');
};
run().catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.json({ message: 'API connection stablish successful ✔' });
});
app.use('/api/v1', userRoutes);
