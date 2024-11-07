import express from 'express';
import GameSession from '../models/gameSession.js';

const router = express.Router();

// GET all game sessions
router.get('/', async (req, res) => {
  try {
    const gameSessions = await GameSession.find().populate('player');
    res.json(gameSessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new game session
router.post('/', async (req, res) => {
  const gameSession = new GameSession({
    player: req.body.playerId,
    startTime: new Date()
  });

  try {
    const newGameSession = await gameSession.save();
    res.status(201).json(newGameSession);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH (update) a game session
router.patch('/:id', getGameSession, async (req, res) => {
  if (req.body.endTime != null) {
    res.gameSession.endTime = new Date(req.body.endTime);
    res.gameSession.duration = res.gameSession.endTime - res.gameSession.startTime;
  }

  try {
    const updatedGameSession = await res.gameSession.save();
    res.json(updatedGameSession);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getGameSession(req, res, next) {
  let gameSession;
  try {
    gameSession = await GameSession.findById(req.params.id);
    if (gameSession == null) {
      return res.status(404).json({ message: 'Game session not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.gameSession = gameSession;
  next();
}

export default router;
