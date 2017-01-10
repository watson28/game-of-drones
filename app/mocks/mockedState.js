var mockedPlayedGames = [
    {
        'playerStatistics': [
            { 'player': 'Jorge', 'wonRounds': 3 },
            { 'player': 'Ignacio', 'wonRounds': 0 }
        ]
    },
    {
        'playerStatistics': [
            { 'player': 'Jorge', 'wonRounds': 3 },
            { 'player': 'Ignacio', 'wonRounds': 0 }
        ]
    },
    {
        'playerStatistics': [
            { 'player': 'Ignacio', 'wonRounds': 3 },
            { 'player': 'Juan', 'wonRounds': 0 }
        ]
    }
];

module.exports = {
    players: [],
    runningGame: null,
    playedGames: mockedPlayedGames,
    gameConfig: {
        roundsToWonGame: 3,
        moves: [
            { move: 'paper', kills: 'rock' },
            { move: 'rock', kills: 'scissors' },
            { move: 'scissors', kills: 'paper' }
        ]
    }
};
