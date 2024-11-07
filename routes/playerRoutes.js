import express from 'express';
import Player from '../models/player.js';

const router = express.Router();

// GET all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new player
router.post('/', async (req, res) => {
  const player = new Player({
    username: req.body.username,
    email: req.body.email
  });

  try {
    const newPlayer = await player.save();
    res.status(201).json(newPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET a specific player
router.get('/:id', getPlayer, (req, res) => {
  res.json(res.player);
});

// PATCH (update) a player
router.patch('/:id', getPlayer, async (req, res) => {
  if (req.body.username != null) {
    res.player.username = req.body.username;
  }
  if (req.body.email != null) {
    res.player.email = req.body.email;
  }
  try {
    const updatedPlayer = await res.player.save();
    res.json(updatedPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a player
router.delete('/:id', getPlayer, async (req, res) => {
  try {
    await res.player.remove();
    res.json({ message: 'Player deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPlayer(req, res, next) {
  let player;
  try {
    player = await Player.findById(req.params.id);
    if (player == null) {
      return res.status(404).json({ message: 'Player not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.player = player;
  next();
}

export default router;
