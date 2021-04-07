function Game() {
  this.gameHasStarted = false;
  this.gamesPlayed = 0;
  this.players = [];
}

Game.prototype.addPlayer = function(name) {
  const player = new Player(name);
  this.players.push(player);
}



function Player(name) {
  this.name = name;
  this.score = {
    turn: 0,
    total: 0,
  }
  this.gamesWon = 0;
}

Player.prototype.roll = function() {
  const randomRoll = Math.floor(Math.random() * 6) + 1
  if (randomRoll === 1) {
    this.score.turn = 0
    return 0
  }
  this.score.turn += randomRoll
  return randomRoll
}

Player.prototype.hold = function() {
  this.score.total += this.score.turn;
  this.score.turn = 0;
}


const game = new Game();
game.addPlayer("Steve")
game.addPlayer("Mary")
const steve = game.players[0]
const mary = game.players[1]