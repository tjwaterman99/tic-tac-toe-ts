export interface Player {
    name: string
    symbol: string
}

export interface GameState {
    players: Player[]
}

export class Game {
    players: Player[]

    constructor(state: GameState) {
        this.players = state.players
    }

    echo(word: string) {
        console.log(word)
    }
}