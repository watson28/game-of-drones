'use strict';

var ACTIONS = {
    SET_PLAYERS: 'ADD_PLAYERS',
    START_NEW_GAME: 'START_NEW_GAME',
    ADD_GAME_ROUND: 'ADD_GAME_ROUND',
    FINISH_RUNNING_GAME: 'FINISH_RUNNING_GAME',
    CANCEL_RUNNING_GAME: 'CANCEL_RUNNING_GAME',
    SAVE_GAME_CONFIG: 'SAVE_GAME_CONFIG'
};

var actionCreators = {
    setPlayers: function (player1Name, player2Name) {
        return {
            type: ACTIONS.SET_PLAYERS,
            player1: player1Name,
            player2: player2Name
        };
    },
    startNewGame: function () {
        return { type: ACTIONS.START_NEW_GAME };
    },
    addGameRound: function (moves) {
        return {
            type: ACTIONS.ADD_GAME_ROUND,
            moves: moves
        };
    },
    finishRunningGame: function () {
        return { type: ACTIONS.FINISH_RUNNING_GAME };
    },
    cancelRunningGame: function () {
        return { type: ACTIONS.CANCEL_RUNNING_GAME };
    },
    saveGameConfig: function (roundsToWonGame, movesConfig) {
        return {
            type: ACTIONS.SAVE_GAME_CONFIG,
            roundsToWonGame: roundsToWonGame,
            movesConfig: movesConfig
        };
    }
};

module.exports = Object.assign({}, ACTIONS, actionCreators);
