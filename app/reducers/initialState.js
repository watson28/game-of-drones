module.exports = {
    players: [],
    runningGame: null,
    playedGames: [],
    gameConfig: {
        roundsToWonGame: 3,
        moves: [
            { move: 'paper', kills: 'rock' },
            { move: 'rock', kills: 'scissors' },
            { move: 'scissors', kills: 'paper' }
        ]
    }
};
