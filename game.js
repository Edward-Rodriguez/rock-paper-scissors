/**
 * pseudo:
 * create a 'choices' array with values 'Rock','Paper','Scissors'
 * function getComputerChoice
 *  generate random number between 0 and 2
 *  return the random num index of the choices array
 */
const choices = ["Rock", "Paper", "Scissors"];

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

  let playerIsWinning; //flag denoting player winning hand

  if (playerSelection === computerSelection)
    return [
      playerIsWinning,
      `It's a tie, computer also chose ${computerSelection}`,
    ];

  switch (playerSelection) {
    case ROCK:
      computerSelection == SCISSORS
        ? (playerIsWinning = true)
        : (playerIsWinning = false);
      break;
    case PAPER:
      computerSelection == ROCK
        ? (playerIsWinning = true)
        : (playerIsWinning = false);
      break;
    case SCISSORS:
      computerSelection == PAPER
        ? (playerIsWinning = true)
        : (playerIsWinning = false);
      break;
  }

  return [
    playerIsWinning,
    playerIsWinning
      ? `You Win! ${playerSelection} beats ${computerSelection}`
      : `You Lose! ${computerSelection} beats ${playerSelection}`,
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
  // choice.addEventListener('click', playRound(e.target.value))
  choice.addEventListener("click", (e) => {
    // console.log(e);
    let playerChoice = e.target.name;
    let computerChoice = getComputerChoice();
    p.textContent = playRound(playerChoice, computerChoice)[1];
    resultsContainer.appendChild(p);
  });
});
