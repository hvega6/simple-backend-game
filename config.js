const mongoose = require('mongoose');
const Player = require('./models/player');
const GameSession = require('./models/gameSession');
const Score = require('./models/score');

const mockData = {
  players: [
    { username: 'player1', email: 'player1@example.com' },
    { username: 'player2', email: 'player2@example.com' },
    { username: 'player3', email: 'player3@example.com' },
    { username: 'player4', email: 'player4@example.com' },
    { username: 'player5', email: 'player5@example.com' },
  ],
  gameSessions: [],
  scores: []
};

async function populateMockData() {
  try {
    // Clear existing data
    await Player.deleteMany({});
    await GameSession.deleteMany({});
    await Score.deleteMany({});

    // Insert players
    const players = await Player.insertMany(mockData.players);

    // Create game sessions and scores for each player
    for (const player of players) {
      for (let i = 0; i < 3; i++) {
        const gameSession = new GameSession({
          player: player._id,
          startTime: new Date(Date.now() - Math.floor(Math.random() * 10000000)),
          endTime: new Date(),
        });
        gameSession.duration = gameSession.endTime - gameSession.startTime;
        await gameSession.save();

        const score = new Score({
          player: player._id,
          gameSession: gameSession._id,
          score: Math.floor(Math.random() * 1000),
        });
        await score.save();
      }
    }

    console.log('Mock data populated successfully');
  } catch (error) {
    console.error('Error populating mock data:', error);
  }
}

module.exports = { populateMockData };
