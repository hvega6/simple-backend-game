import express from 'express';
import Score from '../models/score.js';

const router = express.Router();

// GET all scores
router.get('/', async (req, res) => {
  try {
    const scores = await Score.find().populate('player').populate('gameSession');
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new score
router.post('/', async (req, res) => {
  const score = new Score({
    player: req.body.playerId,
    gameSession: req.body.gameSessionId,
    score: req.body.score
  });

  try {
    const newScore = await score.save();
    res.status(201).json(newScore);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET top scores
router.get('/top', async (req, res) => {
  try {
    const topScores = await Score.find()
      .sort({ score: -1 })
      .limit(10)
      .populate('player');
    res.json(topScores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
