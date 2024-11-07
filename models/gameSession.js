import mongoose from 'mongoose';
import requiredFields from '../requiredFields.js';

// Define game session schema
const gameSessionSchema = new mongoose.Schema({
  player: requiredFields.player,
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  duration: {
    type: Number
  }
});

gameSessionSchema.index({ player: 1, startTime: -1 });

const GameSession = mongoose.model('GameSession', gameSessionSchema);

export default GameSession;
