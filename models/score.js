const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  gameSession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GameSession',
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

scoreSchema.index({ player: 1, score: -1 });
scoreSchema.index({ gameSession: 1 });

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
