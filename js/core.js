// business logic
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
  if (player.score.total >= 100) {
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
// game.addPlayer("Steve")
// game.addPlayer("Mary")

function $addListeners() {
  $('#start-game').on('click', () => {
    game.advancePhase(1)
    $printPhaseScreen()
  })
  $('#player-name').on('submit', e => {
    e.preventDefault()
    const $nameInput = $('#player-name > input')
    const inputtedPlayerName = $nameInput.val()
    game.addPlayer(inputtedPlayerName)
    $nameInput.val("")
    const $li = $('<li/>').text(inputtedPlayerName)
    $('#players-ready').append($li)
  })
  $('#confirm-players').on('click', () => {
    if(game.players.length > 0){
      game.advancePhase(1)
      $printPhaseScreen()
      $printCurrentPlayer()
      // $printPlayerQueue()
    }
  })
  $('#start-over').on('click', () => {
    game.resetGame()
    $printPhaseScreen()
  })
}

function $printPhaseScreen() {
  const phaseId = game.phases[0]
  const $phaseScreen = $(`#${phaseId}`).contents().clone()  
  $replaceMain($phaseScreen)
  $addListeners()
}

function $printCurrentPlayer(currentRoll) {
  const currentPlayer = game.players[0]
  const $currentPlayer = $('#current-player').contents().clone()
  $replaceCenterStage($currentPlayer)
  const $currentRoll = $('#current-roll')
  const $currentPlayerName = $('#current-player-name')
  const $totalScore = $('#total-score')
  const $turnScore = $('#turn-score')
  $currentRoll.text(currentRoll);
  $currentPlayerName.text(currentPlayer.name);
  $totalScore.text(currentPlayer.score.total);
  $turnScore.text(currentPlayer.score.turn)
  $('#roll').on('click', () => {
    const currentRoll = currentPlayer.roll();
    $('#current-roll').text('currentRoll')
    if (currentRoll === 1) game.endTurn()
    $printCurrentPlayer(currentRoll)
  })

  $('#hold').on('click', () => {
    currentPlayer.hold()
    const gameOver = game.endTurn()
    if (gameOver) {
      $printPhaseScreen()
      $replaceMain(`${currentPlayer.name} is the winner!`)
    } else {
      $printCurrentPlayer()
    }
    // $printPlayerQueue()
  })
}

$printPhaseScreen()