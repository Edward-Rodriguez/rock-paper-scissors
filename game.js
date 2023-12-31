const numberOfGamesToWin = 5;
const [ROCK, PAPER, SCISSORS] = ['ROCK', 'PAPER', 'SCISSORS'];
let playerScore = 0;
let computerScore = 0;
let roundNumber = 0;
let gameIsOver = false;

const images = {
  player: {
    [ROCK]: 'img/icons8-hand-rock-96-player.png',
    [PAPER]: 'img/icons8-hand-96-player.png',
    [SCISSORS]: 'img/icons8-hand-scissors-player.png',
  },
  computer: {
    [ROCK]: 'img/icons8-hand-rock-96-computer.png',
    [PAPER]: 'img/icons8-hand-96-computer.png',
    [SCISSORS]: 'img/icons8-hand-scissors-computer.png',
  },
  unknown: 'img/question-mark.png',
};

function getComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3);
  return [ROCK, PAPER, SCISSORS][randomNumber];
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.trim().toUpperCase();
  computerSelection = computerSelection.trim().toUpperCase();
  roundNumber += 1;

  let playerHasWon; //flag denoting player winning hand

  if (playerSelection !== computerSelection) {
    switch (playerSelection) {
      case ROCK:
        computerSelection == SCISSORS
          ? (playerHasWon = true)
          : (playerHasWon = false);
        break;
      case PAPER:
        computerSelection == ROCK
          ? (playerHasWon = true)
          : (playerHasWon = false);
        break;
      case SCISSORS:
        computerSelection == PAPER
          ? (playerHasWon = true)
          : (playerHasWon = false);
        break;
    }

    if (playerHasWon) playerScore += 1;
    else computerScore += 1;
  }

  return {
    playerHasWon,
    roundNumber,
    playerSelection,
    computerSelection,
  };
}

const resultsContainer = document.querySelector('#resultsContainer');
const resultPlayerChoice = document.createElement('span');
const resultComputerChoice = document.createElement('span');
const roundResultContainer = document.createElement('p');
const playerChoiceGroupDiv = document.querySelectorAll('.group');
const playAgainButton = document.getElementById('play-again-btn');
const gameWinnerDiv = document.createElement('div');
const playerChoiceImage = document.querySelector('.player-choice > img');
const computerChoiceImage = document.querySelector('.computer-choice > img');
resultsContainer.appendChild(roundResultContainer);
resultsContainer.appendChild(gameWinnerDiv);
resultPlayerChoice.setAttribute('id', 'result-player-choice');
resultComputerChoice.setAttribute('id', 'result-computer-choice');

function handlePlayerChoiceClick(e) {
  let playerChoice = e.target.name;
  let computerChoice = getComputerChoice();
  const roundResult = playRound(playerChoice, computerChoice);
  resultPlayerChoice.textContent = roundResult.playerSelection;
  resultComputerChoice.textContent = roundResult.computerSelection;
  roundResultContainer.textContent = '';
  roundResultContainer.append(`Round ${roundResult.roundNumber}:`);
  if (roundResult.playerHasWon) {
    roundResultContainer.append(
      ' You Win! ',
      resultPlayerChoice,
      ' beats ',
      resultComputerChoice,
    );
  } else if (roundResult.playerHasWon === false) {
    roundResultContainer.append(
      ' You Lose! ',
      resultComputerChoice,
      ' beats ',
      resultPlayerChoice,
    );
  } else {
    roundResultContainer.append(
      " It's a tie, Computer also chose ",
      resultComputerChoice,
    );
  }
  updateUIScoreCount();
  toggleImages(playerChoice, computerChoice);
  checkWinner();
}

playerChoiceGroupDiv.forEach((choice) => {
  choice.addEventListener('click', (e) => handlePlayerChoiceClick(e));
});

function updateUIScoreCount() {
  const playerSpan = document.querySelector('.player.score-count');
  playerSpan.textContent = playerScore.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const computerSpan = document.querySelector('.computer.score-count');
  computerSpan.textContent = computerScore.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

function checkWinner() {
  if (playerScore === 5 || computerScore === 5) {
    gameIsOver = true;
    gameWinnerDiv.classList.add('game-result');
    if (playerScore == 5) {
      gameWinnerDiv.classList.add('winner');
      gameWinnerDiv.textContent = 'You Win!';
    } else {
      gameWinnerDiv.classList.add('loser');
      gameWinnerDiv.textContent = 'Game Over!';
    }
    toggleUserInputVisability();
    togglePlayAgainButton();
    return true;
  } else return false;
}

function toggleImages(playerChoice, computerChoice) {
  if (gameIsOver) {
    playerChoiceImage.setAttribute('src', images.unknown);
    computerChoiceImage.setAttribute('src', images.unknown);
  } else {
    playerChoiceImage.setAttribute('src', images.player[playerChoice]);
    computerChoiceImage.setAttribute('src', images.computer[computerChoice]);
  }
}

function toggleUserInputVisability() {
  playerChoiceGroupDiv.forEach((group) => {
    if (gameIsOver) {
      group.classList.add('disable-click');
      group.classList.remove('hover');
    } else {
      group.classList.remove('disable-click');
      group.classList.add('hover');
    }
  });
}

function togglePlayAgainButton() {
  if (playAgainButton.style.display === 'block') {
    playAgainButton.style.display = 'none';
  } else playAgainButton.style.display = 'block';
}

playAgainButton.addEventListener('click', resetGame);

function resetGame() {
  toggleImages();
  playerScore = 0;
  computerScore = 0;
  roundNumber = 0;
  gameIsOver = false;
  resultsContainer.childNodes.forEach((childElement) => {
    childElement.textContent = '';
    childElement.classList.remove('winner', 'loser');
  });
  toggleUserInputVisability();
  togglePlayAgainButton();
  updateUIScoreCount();
}
