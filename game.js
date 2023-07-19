/**
 * pseudo:
 * create a 'choices' array with values 'Rock','Paper','Scissors'
 * function getComputerChoice
 *  generate random number between 0 and 2
 *  return the random num index of the choices array
 */
const choices = ["Rock", "Paper", "Scissors"];
let playerScore = 0;
let computerScore = 0;
let roundNumber = 0;
const numberOfGamesToWin = 5;
let = 0;

function getComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}
//console.log(getComputerChoice());

/**
 * pseudo:
 * function playRound(playerSelection, computerSelection)
 *  if both parameters match(lowercase) return "It's a tie, computer also chose .."
 *  create boolean variable isWinning
 *  switch playerSelection
 *    case rock
 *      computerSelection == paper ? isWinning = false :
 *        computerSelection == scissors ? isWinning = true :
 *        break
 *    case paper
 *      computerSelection == rock ? isWinning = true :
 *        computerSelection == scissors ? isWinning = false :
 *        break
 *    case scissors
 *      computerSelection == rock ? isWinning = false :
 *        computerSelection == paper ? isWinning = true :
 *        break
 *
 *  return
 *    isWinning ? 'You Win! playerSelection beats computerSelection' :
 *      'You Lose! computerSelection beats playerSelection
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

// // test
// const playerSelection = "rock";
// const computerSelection = getComputerChoice();
// console.log(playRound(playerSelection, computerSelection));
// console.log(playRound(playerSelection, computerSelection));
// playRound(playerSelection, computerSelection)[0]
//   ? console.log("Winning!")
//   : console.log("Losing!");

/**
 * pseudo:
 * function game(numOfRounds)
 *  create playerScore variable
 *  create computerScore variable
 *  initialize both variables to zero
 *  loop through the numOfRounds
 *    create temp variable roundResult
 *    initialize value to: playRound(playerSelection, computerSelection)
 *    log results to console roundResult[1]
 *    if roundResult[0] is not undefined
 *      if roundResult[0] is true, increment playerScore by 1
 *      else increment computerScore by 1
 *  if playerScore == computerScore ? console log game is tied:
 *    else if playerScore > computerScore ? console log you won :
 *    else console log you lose
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
  // console.log("player chose:", playerChoice, typeof playerChoice);
  return playerChoice;
}

function validateUserInput(input) {
  input = input.trim().toUpperCase();
  if (input === ROCK || input == PAPER || input === SCISSORS) return true;
  else return false;
}

const resultsContainer = document.querySelector("#resultsContainer");
const p = document.createElement("p");

// game(5);
const choicesImages = document.querySelectorAll("img");
choicesImages.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    let playerChoice = e.target.name;
    let computerChoice = getComputerChoice();
    p.textContent = playRound(playerChoice, computerChoice)[1];
    resultsContainer.appendChild(p);
    updateUIScoreCount();
    checkWinner();
  });
});

/**
 * problem:
 * update score count on page after a playerROund
 * pseudo:
 * function updateUIScoreCount(playerHasWon)
 *  playerSpan = queryselector(player, socre-count)
 *  playerSpan.textContent = playerScore.toLocaleString('en-US,{minimumIntegerDigits: 2, useGrouping:false})
 *  computerSpan = queryselector(computer, socre-count)
 *  computerSpan.textContent = computerScore.toLocaleString('en-US,{minimumIntegerDigits: 2, useGrouping:false})
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

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  roundNumber = 0;
}

function checkWinner() {
  if (playerScore === 5 || computerScore === 5) {
    const gameWinnerDiv = document.createElement("div");
    gameWinnerDiv.classList.add("game-result");
    if (playerScore == 5) {
      gameWinnerDiv.classList.add("winner");
      gameWinnerDiv.textContent = "You Win!";
    } else {
      gameWinnerDiv.classList.add("loser");
      gameWinnerDiv.textContent = "You Lose!";
    }
    resultsContainer.appendChild(gameWinnerDiv);
    return true;
  } else return false;
}
