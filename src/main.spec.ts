import { Player, Game, Piece, Turn } from './main'


describe("The game", () => {
    let player1: Player
    let player2: Player
    let game: Game
    let pieces: Piece[]
    let turns: Turn[]

    beforeEach( () => {
        player1 = {name: 'Tom', symbol: 'X'}
        player2 = {name: 'Hannah', symbol: 'O'}
        pieces = Array.from(Array(9).keys(), (i) => ({index: i}))
        turns = Array(0)
        game = new Game({
            players: [player1, player2],
            pieces: pieces,
            turns: turns
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

    test("Starts with empty turns", () => {
        expect(game.turns.length).toBe(0)
    })

    test("Starts with a first player", () => {
        expect(game.currentPlayer()).toBe(player1)
    })

    test("Starts without a winner", () => {
        expect(game.isFinished().over).toBe(false)
    })

    test("Can play turns", () => {
        let turn = game.play(0)
        expect(turn.player).toBe(player1)
        expect(game.turns.length).toBe(1)
        expect(game.pieces[0].player).toBe(player1)
        expect(game.currentPlayer()).toBe(player2)

        let turn2 = game.play(1)
        expect(turn2.player).toBe(player2)
        expect(game.turns.length).toBe(2)
        expect(game.pieces[1].player).toBe(player2)
        expect(game.currentPlayer()).toBe(player1)
    })

    test("Can't play the same piece twice", () => {
        const t = () => {
            game.play(1)
            game.play(1)
        }
        expect(t).toThrow()
    })

    test("Can find a winner", () => {
        game.play(0)
        game.play(1)
        game.play(3)
        game.play(4)
        game.play(6)
        let result = game.isFinished()
        expect(result.over).toBe(true)
        expect(result.winning_player).toBe(player1)
        expect(result.winning_pieces).toContain(game.turns[0].piece)
    })

    test("Can end in a stalement", () => {
        game.play(0)
        game.play(1)
        game.play(2)
        game.play(4)
        game.play(3)
        game.play(5)
        game.play(7)
        game.play(6)
        game.play(8)
        let result = game.isFinished()
        expect(result.over).toBe(true)
        expect(result.winning_player).toBe(undefined)
    })
})
