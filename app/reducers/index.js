'use strict';

var actions = require('actions');
var _ = require('lodash');

module.exports = function (state, action) {
    if (!action || !action.type) { return state }

    switch (action.type) {
        case actions.SET_PLAYERS:
            return Object.assign({}, state, {
                players: [action.player1, action.player2]
            });

        case actions.START_NEW_GAME:
            return Object.assign({}, state, {
                runningGame: {
                    roundWinners: [],
                    winner: null
                }
            });

        case actions.ADD_GAME_ROUND:
            return Object.assign({}, state, {
                runningGame: {
                    roundWinners: state.runningGame.roundWinners
                                .concat([calculateRoundWinner(action.moves, state.gameConfig.moves)])
                }
            });

        case actions.FINISH_RUNNING_GAME:
            return Object.assign({}, state, {
                runningGame: Object.assign({}, state.runningGame, {
                    winner: calculateGameWinner(state.runningGame.roundWinners)
                }),
                playedGames: state.playedGames.concat([{
                    playerStatistics: getPlayersStatistics(state.players, state.runningGame.roundWinners)
                }])
            });

        case actions.CANCEL_RUNNING_GAME:
            return Object.assign({}, state, {
                runningGame: null
            });

        case actions.SAVE_GAME_CONFIG:
            return Object.assign({}, state, {
                gameConfig: {
                    roundsToWonGame: action.roundsToWonGame,
                    moves: action.movesConfig
                }
            });

        default: return state;
    }
};

function calculateRoundWinner (moves, movesConfig) {
    var winnerMoves = _.filter(moves, function (playerMove) {
        var killRules = _.filter(movesConfig, { kills: playerMove.move });
        var opponentsMoves = _.reject(moves, { player: playerMove.player });
        var hasLost = _.some(killRules, function (killRule) {
            return _.some(opponentsMoves, { move: killRule.move });
        });
        return !hasLost;
    });

    return winnerMoves.length === 1 ? winnerMoves[0].player : null;
}

function calculateGameWinner (roundWinners) {
    var roundWinnerFrecuency = groupRoundWinners(roundWinners);
    var maxFrecuency = 0;
    var result;
    for (var roundWinner in roundWinnerFrecuency) {
        if (roundWinnerFrecuency[roundWinner] > maxFrecuency) {
            maxFrecuency = roundWinnerFrecuency[roundWinner];
            result = roundWinner;
        }
    }

    return result;
}

function getPlayersStatistics (players, roundWinners) {
    var roundWinnerFrecuency = groupRoundWinners(roundWinners);
    return _.map(players, function (player) {
        return { player: player, wonRounds: roundWinnerFrecuency[player] || 0 };
    });
}

function groupRoundWinners (roundWinners) {
    var group = {};
    roundWinners.forEach(function (roundWinner) {
        group[roundWinner] = (group[roundWinner] || 0) + 1;
    });

    return group;
}
