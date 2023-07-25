const numberOfGamesToWin = 5;
const [ROCK, PAPER, SCISSORS] = ["ROCK", "PAPER", "SCISSORS"];
let playerScore = 0;
let computerScore = 0;
let roundNumber = 0;
let gameIsOver = false;

function getComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3);
  return [ROCK, PAPER, SCISSORS][randomNumber];
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.trim().toUpperCase();
  computerSelection = computerSelection.trim().toUpperCase();
  roundNumber += 1;

  let playerHasWon; //flag denoting player winning hand

  if (playerSelection === computerSelection)
    return [
      playerHasWon,
      `Round ${roundNumber}: It's a tie, computer also chose ${computerSelection}`,
    ];

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

  if (playerHasWon !== undefined) {
    if (playerHasWon) playerScore += 1;
    else computerScore += 1;
  }

  return [
    playerHasWon,
    playerHasWon
      ? `Round ${roundNumber}: You Win! ${playerSelection} beats ${computerSelection}`
      : `Round ${roundNumber}: You Lose! ${computerSelection} beats ${playerSelection}`,
  ];
}

const resultsContainer = document.querySelector("#resultsContainer");
const roundResultContainer = document.createElement("p");
const playerChoiceGroupDiv = document.querySelectorAll(".group");
const playAgainButton = document.getElementById("play-again-btn");
const gameWinnerDiv = document.createElement("div");
resultsContainer.appendChild(roundResultContainer);
resultsContainer.appendChild(gameWinnerDiv);

function handlePlayerChoiceClick(e) {
  let playerChoice = e.target.name;
  let computerChoice = getComputerChoice();
  roundResultContainer.textContent = playRound(playerChoice, computerChoice)[1];
  updateUIScoreCount();
  checkWinner();
}

playerChoiceGroupDiv.forEach((choice) => {
  choice.addEventListener("click", (e) => handlePlayerChoiceClick(e));
});

function updateUIScoreCount() {
  const playerSpan = document.querySelector(".player.score-count");
  playerSpan.textContent = playerScore.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const computerSpan = document.querySelector(".computer.score-count");
  computerSpan.textContent = computerScore.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

function checkWinner() {
  if (playerScore === 5 || computerScore === 5) {
    gameIsOver = true;
    gameWinnerDiv.classList.add("game-result");
    if (playerScore == 5) {
      gameWinnerDiv.classList.add("winner");
      gameWinnerDiv.textContent = "You Win!";
    } else {
      gameWinnerDiv.classList.add("loser");
      gameWinnerDiv.textContent = "Game Over!";
    }
    toggleUserInputVisability();
    togglePlayAgainButton();
    return true;
  } else return false;
}

function toggleUserInputVisability() {
  playerChoiceGroupDiv.forEach((group) => {
    if (gameIsOver) {
      group.classList.add("disable-click");
      group.classList.remove("hover");
    } else {
      group.classList.remove("disable-click");
      group.classList.add("hover");
    }
  });
}

function togglePlayAgainButton() {
  if (playAgainButton.style.display === "block") {
    playAgainButton.style.display = "none";
  } else playAgainButton.style.display = "block";
}

playAgainButton.addEventListener("click", resetGame);

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  roundNumber = 0;
  gameIsOver = false;
  resultsContainer.childNodes.forEach((childElement) => {
    childElement.textContent = "";
    childElement.classList.remove("winner", "loser");
  });
  toggleUserInputVisability();
  togglePlayAgainButton();
  updateUIScoreCount();
}
