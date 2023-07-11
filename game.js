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
    return `It's a tie, computer also chose ${computerSelection}`;

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

  return playerIsWinning
    ? `You Win! ${playerSelection} beats ${computerSelection}`
    : `You Lose! ${computerSelection} beats ${playerSelection}`;
}

// test
const playerSelection = "rock";
const computerSelection = getComputerChoice();
console.log(playRound(playerSelection, computerSelection));

/**
 * pseudo:
 * function game(numOfRounds)
 *  loop through the numOfRounds
 *    playRound(playerSelection, computerSelection)
 */
