import { Player, Game, Piece } from './main'


describe("The game", () => {
    let player1: Player
    let player2: Player
    let game: Game
    let pieces: Piece[]

    beforeEach( () => {
        player1 = {name: 'Tom', symbol: 'X'}
        player2 = {name: 'Hannah', symbol: 'O'}
        pieces = Array.from(Array(9).keys(), (i) => ({index: i}))
        game = new Game({
            players: [player1, player2],
            pieces: pieces
        })
    
    })

    test("Starts with multiple players", () => {
        expect(game.players.length).toBe(2)
    })

    test("Starts with 9 pieces from 0 thru 8", () => {
        expect(game.pieces.length).toBe(9)
        expect(game.pieces[0].index).toBe(0)
        expect(game.pieces[8].index).toBe(8)
    })
})
