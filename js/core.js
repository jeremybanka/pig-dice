function Player(name) {
  this.name = name;
  this.score = {
    current: 0,
    total: 0,
  }
  this.gamesWon = 0;
}

Player.prototype.roll = function() {
  const randomRoll = Math.floor(Math.random() * 6) + 1
  if (randomRoll === 1) {
    this.score.current = 0
    return 0
  }
  this.score.current += randomRoll
  return randomRoll
}



const name = "steve";
const player1 = new Player(name);

