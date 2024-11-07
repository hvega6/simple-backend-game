import mongoose from 'mongoose';
import requiredFields from '../requitedFields.js';

// Define player schema
const playerSchema = new mongoose.Schema({
  username: requiredFields.username,
  email: requiredFields.email,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

playerSchema.index({ username: 1, email: 1 });

const Player = mongoose.model('Player', playerSchema);

export default Player;
