import { Player, Game } from './main'


describe("The game", () => {
    let player1: Player = {name: 'Tom', symbol: 'X'}
    let player2: Player = {name: 'Hannah', symbol: 'O'}
    let game = new Game({
        players: [player1, player2]
    })

    test("Has multiple players", () => {
        expect(game.players.length).toBeGreaterThan(0)   
    })
})
