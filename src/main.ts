export interface Player {
    name: string
    symbol: string
}

export interface Piece {
    index: number
    player?: Player
}

export interface GameState {
    players: Player[],
    pieces: Piece[]
}

export class Game {
    players: Player[]
    pieces: Piece[]

    constructor(state: GameState) {
        this.players = state.players
        this.pieces = state.pieces
    }

    echo(word: string) {
        console.log(word)
    }
}