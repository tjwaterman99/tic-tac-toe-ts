import _ from 'underscore';

export interface Player {
    name: string
    symbol: string
}

export interface Piece {
    index: number
    player?: Player
}

export interface Turn {
    player: Player
    piece: Piece
}

export interface GameState {
    players: Player[]
    pieces: Piece[]
    turns: Turn[]
}

export interface GameResult {
    over: boolean
    winning_player?: Player
    winning_pieces?: Piece[]
}

export class Game {
    players: Player[]
    pieces: Piece[]
    turns: Turn[]

    constructor(state: GameState) {
        this.players = state.players
        this.pieces = state.pieces
        this.turns = state.turns
    }

    currentPlayer(): Player {
        if (this.turns.length == 0) {
            return this.players[0]
        } else {
            let previous_player = this.turns[this.turns.length - 1].player
            let previous_player_index = this.players.indexOf(previous_player)
            let current_player_index = Math.abs(previous_player_index - 1)
            return this.players[current_player_index]
        }
    }

    play(piece: number) {
        if (this.pieces[piece].player) {
            throw ("Can not play that location")
        }
        let turn: Turn = {
            piece: this.pieces[piece],
            player: this.currentPlayer()
        }
        this.pieces[piece].player = this.currentPlayer()
        this.turns.push(turn)
        return turn
    }

    isFinished(): GameResult {
        let game_over = false
        let winning_states = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        let player1_turns = this.turns.filter((t) => {
            if (t.player == this.players[0]) {
                return true
            }
        }).map((t) => {
            return t.piece.index
        })

        let player2_turns = this.turns.filter((t) => {
            if (t.player == this.players[1]) {
                return true
            }
        }).map((t) => {
            return t.piece.index
        })

        let winner: Player | undefined
        let winning_pieces: Piece[] | undefined

        for (let state of winning_states) {
            if (_.intersection(state, player1_turns).length == 3) {
                winner = this.players[0]
                winning_pieces = this.pieces.filter((p) => _.contains(state, p.index))
                break
            }
            if (_.intersection(state, player2_turns).length == 3) {
                winner = this.players[1]
                winning_pieces = this.pieces.filter((p) => _.contains(state, p.index))
                break
            }
        }

        if (winner || this.turns.length == 9) {
            game_over = true
        } else {
            game_over = false
        }

        return {
            over: game_over,
            winning_player: winner,
            winning_pieces: winning_pieces
        }
    }

    restart() {
        this.turns = new Array()
        for (let piece of this.pieces) {
            piece.player = undefined
        }
    }
}


export function createGame(first_player_name: string, second_player_name: string): Game {
    let player1 = { name: first_player_name, symbol: 'X' }
    let player2 = { name: second_player_name, symbol: 'O' }
    let pieces = Array.from(Array(9).keys(), (i) => ({ index: i }))
    let turns = Array(0)
    let game = new Game({
        players: [player1, player2],
        pieces: pieces,
        turns: turns
    })
    return game
}