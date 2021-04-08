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
  const playerWonTheGame = this.checkWin(playerEndingTurn)
  return playerWonTheGame
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
  console.log('advancing',  number, '')
  for (let index = 0; index < number; index ++) {
    const currentPhase = this.phases.shift();
    this.phases.push(currentPhase);
  }
}

Game.prototype.resetGame = function() {
  this.players.forEach(player => {
    player.score.turn = 0
    player.score.total = 0
  })
  this.advancePhase(2)
}

const demoGame = new Game();
demoGame.addPlayer("Steve")
demoGame.addPlayer("Mary")
const steve = demoGame.players[0]
const mary = demoGame.players[1]

function $replaceMain($content) {
  const $main = $('main')
  $main.empty()
  $main.append($content)
}
function $replaceCenterStage($content) {
  const $centerStage = $('#center-stage')
  $centerStage.empty()
  $centerStage.append($content)
}

const game = new Game();
game.addPlayer("Steve")
game.addPlayer("Mary")

function $printPhaseScreen() {
  const phaseId = game.phases[0]
  const $phaseScreen = $(`#${phaseId}`).contents().clone()  

  $replaceMain($phaseScreen)
  $('#start-game').on('click', () => {
    game.advancePhase(1)
    $printPhaseScreen()
  })

  $('#confirm-players').on('click', () => {
    game.advancePhase(1)
    $printPhaseScreen()
    $printCurrentPlayer()
    // $printPlayerQueue()
  })

  $('#start-over').on('click', () => {
    game.advancePhase(1)
    $printPhaseScreen()
  })

  
}
function $printCurrentPlayer() {
  const currentPlayer = game.players[0]
  const $currentPlayer = $('#current-player').contents().clone()
  $replaceCenterStage($currentPlayer)
  $('#roll').on('click', () => {
    const currentRoll = game.players[0].roll();
    console.log(
      game.players[0].name, 
      'just scored', 
      currentRoll, 
      'turn score is now',
      game.players[0].score.turn, 
      'total',
      game.players[0].score.total, 
    )
    if (currentRoll === 1) game.endTurn()
    $printCurrentPlayer()
  })

  $('#hold').on('click', () => {
    game.players[0].hold()
    const gameOver = game.endTurn()
    if (gameOver) {
      game.advancePhase(1);
      $printPhaseScreen()
    } else {
      $printCurrentPlayer()
    }
    // $printPlayerQueue()
  })
}

$printPhaseScreen()