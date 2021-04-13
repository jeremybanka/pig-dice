import Game from "../src/js/Game"

describe(`new Game()`, () => {
  it(`creates an empty game with no players`, () => {
    const game = new Game()
    const expected = {
      phases: [`title-card`, `sign-in`, `gameplay`, `recap`],
      gamesPlayed: 0,
      players: [],
    }
    expect(game).toEqual(expected)
  })
})


// const player = new Player(name)
// this.players.push(player)
//     
// this.name = name
// this.score = {
//   turn: 0,
//   total: 0,
// }
// this.gamesWon = 0
describe(`Game.prototype.addPlayer(name)`, () => {
  it(`will add a player`, () => {
    const game = new Game()
    game.addPlayer(`Brent`)
    const { players } = game
    const expected = [
      {
        name: `Brent`,
        score: { turn: 0, total: 0 },
        gamesWon: 0,
      },
    ]
    expect(players).toEqual(expected) 
  })
})

