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
  } else {
    this.score.turn += randomRoll
  }
  return randomRoll // call game.endTurn() if 1 is returned
}

Player.prototype.hold = function() {
  this.score.total += this.score.turn;
  this.score.turn = 0;
}

function Game() {
  this.phases = ['title-card', 'sign-in', 'gameplay', 'recap'];
  this.gamesPlayed = 0;
  this.players = [];
}

Game.prototype.addPlayer = function(name) {
  const player = new Player(name);
  this.players.push(player);
}

Game.prototype.endTurn = function() {
  const playerEndingTurn = this.players.shift()
  this.players.push(playerEndingTurn)
  playerEndingTurn.hold()
  this.checkWin(playerEndingTurn)
}

Game.prototype.checkWin = function(player) {
  if (player.score.total > 30) {
    player.gamesWon += 1;
    this.advancePhase(1);
    return true;
  }
  return false;
}

Game.prototype.advancePhase = function(number) {
  for (let index = 0; index < number; index ++) {
    const currentPhase = this.phases.shift();
    this.phases.push(currentPhase);
  }
}

const game = new Game();
game.addPlayer("Steve")
game.addPlayer("Mary")
const steve = game.players[0]
const mary = game.players[1]