import Player from './Player'

export default function Game() {
  this.phases = [`title-card`, `sign-in`, `gameplay`, `recap`]
  this.gamesPlayed = 0
  this.players = []
}

Game.prototype.addPlayer = function (name) {
  const player = new Player(name)
  this.players.push(player)
}

Game.prototype.endTurn = function () {
  const playerEndingTurn = this.players.shift()
  this.players.push(playerEndingTurn)
  playerEndingTurn.hold()
  const playerWonTheGame = this.checkWin(playerEndingTurn)
  return playerWonTheGame
}

Game.prototype.checkWin = function (player) {
  if (player.score.total >= 100) {
    player.gamesWon += 1
    this.advancePhase(1)
    return true
  }
  return false
}

Game.prototype.advancePhase = function (number) {
  console.log(`advancing`, number, ``)
  for (let index = 0; index < number; index++) {
    const currentPhase = this.phases.shift()
    this.phases.push(currentPhase)
  }
}

Game.prototype.resetGame = function () {
  this.players.forEach(player => {
    player.score.turn = 0
    player.score.total = 0
  })
  this.advancePhase(2)
}