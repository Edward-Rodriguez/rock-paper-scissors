/**
 */
const choices = ["Rock", "Paper", "Scissors"];
let playerScore = 4;
let computerScore = 0;
let roundNumber = 0;
const numberOfGamesToWin = 5;
let gameIsOver = false;
let = 0;

function getComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

/**
 */
const [ROCK, PAPER, SCISSORS] = ["ROCK", "PAPER", "SCISSORS"];

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
      : `Round ${roundNumber}:You Lose! ${computerSelection} beats ${playerSelection}`,
  ];
}

/**
 * function to play n rounds and log results
 */
function game(totalNumOfRounds = 5) {
  let playerScore = 0;
  let computerScore = 0;

  for (let round = 0; round < totalNumOfRounds; round++) {
    let playerSelection = getUserInput();
    let computerSelection = getComputerChoice();

    let playerWon = playRound(playerSelection, computerSelection);
    console.log(`Round ${round}: ${playerWon[1]}`);
    //index 0 contains boolean value of round result (player perspective)
    if (playerWon[0] != undefined) {
      if (playerWon[0] == true) playerScore += 1;
      else computerScore += 1;
    }
  }

  if (playerScore === computerScore) console.log("No winner, game is tied");
  else if (playerScore > computerScore)
    console.log("Congrats you have won the game!");
  else console.log("You have lost!");
  console.log(
    `Final Score is player: ${playerScore} and computer:${computerScore}`
  );
}

function getUserInput() {
  let playerChoice;
  let isValidUserInput;
  do {
    playerChoice = prompt("Make your choice: Rock, Paper or Scisscors");
    isValidUserInput = validateUserInput(playerChoice);
  } while (!isValidUserInput);
  return playerChoice;
}

function validateUserInput(input) {
  input = input.trim().toUpperCase();
  if (input === ROCK || input == PAPER || input === SCISSORS) return true;
  else return false;
}

const resultsContainer = document.querySelector("#resultsContainer");
const roundResultContainer = document.createElement("p");
const playerChoiceGroupDiv = document.querySelectorAll(".group");
const playAgainButton = document.getElementById("play-again-btn");

playerChoiceGroupDiv.forEach((choice) => {
  choice.addEventListener("click", (e) => handlePlayerChoiceClick(e));
});

function handlePlayerChoiceClick(e) {
  let playerChoice = e.target.name;
  let computerChoice = getComputerChoice();
  roundResultContainer.textContent = playRound(playerChoice, computerChoice)[1];
  resultsContainer.appendChild(roundResultContainer);
  updateUIScoreCount();
  checkWinner();
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
  if ((playAgainButton.style.display = "none")) {
    playAgainButton.style.display = "block";
  } else playAgainButton.style.display = "none";
}

/**
 *
 *  TODO: add styling to score of winner
 *  if playerHasWon, winner = "player" else "computer" aka class names
 *  winner_element = queryselector(winner, acore-count)
 *  winner_element.textContent =
 */
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
    const gameWinnerDiv = document.createElement("div");
    gameWinnerDiv.classList.add("game-result");
    if (playerScore == 5) {
      gameWinnerDiv.classList.add("winner");
      gameWinnerDiv.textContent = "You Win!";
    } else {
      gameWinnerDiv.classList.add("loser");
      gameWinnerDiv.textContent = "Game Over!";
    }
    resultsContainer.appendChild(gameWinnerDiv);
    toggleUserInputVisability();
    togglePlayAgainButton();
    return true;
  } else return false;
}

playAgainButton.addEventListener("click", resetGame);

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  roundNumber = 0;
  gameIsOver = false;
  resultsContainer.childNodes.forEach((childElement) => {
    console.log(childElement);
    resultsContainer.remove(childElement);
  });
  toggleUserInputVisability();
  togglePlayAgainButton();
  updateUIScoreCount();
}
