import mongoose from 'mongoose';
import requiredFields from '../requiredFields.js';

// Define score schema
const scoreSchema = new mongoose.Schema({
  player: requiredFields.player,
  gameSession: requiredFields.gameSession,
  score: requiredFields.score,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

scoreSchema.index({ player: 1, score: -1 });
scoreSchema.index({ gameSession: 1 });

const Score = mongoose.model('Score', scoreSchema);

export default Score;
