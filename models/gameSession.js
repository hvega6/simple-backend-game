const mongoose = require('mongoose');

const gameSessionSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
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

module.exports = GameSession;
