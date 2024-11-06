const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { populateMockData } = require('./config'); // Import the function

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('strictQuery', false);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
  await populateMockData(); // Call the function to populate mock data
});

// Import routes
const playerRoutes = require('./routes/playerRoutes');
const gameSessionRoutes = require('./routes/gameSessionRoutes');
const scoreRoutes = require('./routes/scoreRoutes');

// Use routes
app.use('/api/players', playerRoutes);
app.use('/api/game-sessions', gameSessionRoutes);
app.use('/api/scores', scoreRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
