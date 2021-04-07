Describe: Player(name)

Test: 
  will create a player with desired name with scores 0, no games won
Code: 
  const player1 = new Player('Jem')
  player1
Expect:
  Player {
    name: 'Jem',
    score: { total: 0, current: 0 },
    gamesWon: 0,
  }


Describe: Game(number)

  Test:
    Will create game object with 2 players
  Code:
    const game = new Game(2)
    game
  Expect:
    Game {
      gameHasStarted: false,
      gamesPlayed: 0,
      players: [null, null]
    }

  Describe: Game.prototype.addPlayer(name, index)
    Test:
      Will add player to game at desired index
    Code:
      currentGame.addPlayer('John', 0)
      currentGame.players
    Expect:
      [ 
        Player {
          name: 'John',
          score: { total: 0, current: 0 },
          gamesWon: 0,
        }, 
        null
      ]
