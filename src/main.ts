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
    players: Player[],
    pieces: Piece[],
    turns: Turn[]
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
            throw("Can not play a location already played")
        }
        let turn: Turn = {
            piece: this.pieces[piece],
            player: this.currentPlayer()
        }
        this.pieces[piece].player = this.currentPlayer()
        this.turns.push(turn)
        return turn
    }
}