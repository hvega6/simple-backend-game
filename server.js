import { testMflix } from './routes/test.js';
import express from "express";
import mongoose from 'mongoose';
import 'dotenv/config';
// import  populateMockData  from './config.js';
import playerRoutes from "./routes/playerRoutes.js"
import gameSessionRoutes from "./routes/gameSessionRoutes.js"
import scoreRoutes from "./routes/scoreRoutes.js"

const app = express();
app.use(express.json());

// await testMflix();

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.set('strictQuery', false);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
  // await populateMockData(); // Call the function to populate mock data
});

// Use routes
app.use('/api/players', playerRoutes);
app.use('/api/game-sessions', gameSessionRoutes);
app.use('/api/scores', scoreRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
