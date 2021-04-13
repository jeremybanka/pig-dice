// STYLE
import '../styles/core.scss'
// BUSINESS
import Game from './Game'
// INTERFACE
import $ from 'jquery'

function $replaceMain($content) {
  const $main = $(`main`)
  $main.empty()
  $main.append($content)
}
function $replaceCenterStage($content) {
  const $centerStage = $(`#center-stage`)
  $centerStage.empty()
  $centerStage.append($content)
}

const game = new Game()
// game.addPlayer("Steve")
// game.addPlayer("Mary")

function $addListeners() {
  $(`#start-game`).on(`click`, () => {
    game.advancePhase(1)
    $printPhaseScreen()
  })
  $(`#player-name`).on(`submit`, e => {
    e.preventDefault()
    const $nameInput = $(`#player-name > input`)
    const inputtedPlayerName = $nameInput.val()
    game.addPlayer(inputtedPlayerName)
    $nameInput.val(``)
    const $li = $(`<li/>`).text(inputtedPlayerName)
    $(`#players-ready`).append($li)
  })
  $(`#confirm-players`).on(`click`, () => {
    if (game.players.length > 0) {
      game.advancePhase(1)
      $printPhaseScreen()
      $printCurrentPlayer()
      // $printPlayerQueue()
    }
  })
  $(`#start-over`).on(`click`, () => {
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
  const $currentPlayer = $(`#current-player`).contents().clone()
  $replaceCenterStage($currentPlayer)
  const $currentRoll = $(`#current-roll`)
  const $currentPlayerName = $(`#current-player-name`)
  const $totalScore = $(`#total-score`)
  const $turnScore = $(`#turn-score`)
  $currentRoll.text(currentRoll)
  $currentPlayerName.text(currentPlayer.name)
  $totalScore.text(currentPlayer.score.total)
  $turnScore.text(currentPlayer.score.turn)
  $(`#roll`).on(`click`, () => {
    const currentRoll = currentPlayer.roll()
    $(`#current-roll`).text(`currentRoll`)
    if (currentRoll === 1) game.endTurn()
    $printCurrentPlayer(currentRoll)
  })

  $(`#hold`).on(`click`, () => {
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