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
console.log(getComputerChoice());
