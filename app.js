// Array with options and what they beat
const options = [
  { name: "rock", beats: "scissors", beats_text: "Rock beats scissors!" },
  { name: "scissors", beats: "paper", beats_text: "Scissors beats paper!" },
  { name: "paper", beats: "rock", beats_text: "Paper beats rock!" },
];

// Event Listener for the options to play the game
document.querySelectorAll(".option").forEach((option) => {
  option.addEventListener("click", () => {
    // Variables with options chosen by player and computer
    const player_choice = option.children[0].dataset.value;
    const computer_choice = selectComputerChoice();

    // Turns the choiches into Objects from array Options
    // to compare and manipulate more easily
    const player_choice_OBJ = options.find(
      (option) => option.name === player_choice
    );
    const computer_choice_OBJ = options.find(
      (option) => option.name === computer_choice
    );

    // Variables of the images of the chosen options
    const player_image = document.querySelector("#your-choice");
    const computer_image = document.querySelector("#computer-choice");

    // Verifies who won the match
    const winner = verifyWinner(
      player_choice_OBJ,
      computer_choice_OBJ,
      player_image,
      computer_image
    );

    // Swapes images for the chosen ones of the match
    // If first time, removes the class hidden so they will show
    player_image.src = `./img/${player_choice}.png`;
    computer_image.src = `./img/${computer_choice}.png`;
    player_image.classList.remove("hidden");
    computer_image.classList.remove("hidden");

    // Shows text about who won the match if there's a winner
    // If first time, removes the class hidden so it will show
    const beats_text = document.getElementById("beats-text");
    winner
      ? (beats_text.innerText = winner.beats_text)
      : (beats_text.innerHTML = "<br>");
    document.getElementById("winner-text-container").classList.remove("hidden");
  });
});

// Randomly chooses a number from 0 to 2
// and returns the corresponding item from the array Options
function selectComputerChoice() {
  return options[(number = Math.floor(Math.random() * 3))].name;
}

// Shows who the winner is
// adds animation to the corresponding image
// and increases their points
function verifyWinner(
  player_choice,
  computer_choice,
  player_image,
  computer_image
) {
  // Scores of players and winner text
  const player_score = document.getElementById("player-score");
  const computer_score = document.getElementById("computer-score");
  const winner_text = document.getElementById("winner-text");

  if (player_choice.beats === computer_choice.name) {
    winner_text.innerText = "You won...";
    player_score.innerText = parseInt(player_score.innerText) + 1;
    addWinnerAnimation(player_image);
    return player_choice;
  } else if (computer_choice.beats === player_choice.name) {
    winner_text.innerText = "You lost...";
    computer_score.innerText = parseInt(computer_score.innerText) + 1;
    addWinnerAnimation(computer_image);
    return computer_choice;
  } else {
    // In case of a draw
    winner_text.innerText = "It's a draw!";
    return null;
  }
}

// Adds animation to the winner image
// and removes it when it's finished to reset it
function addWinnerAnimation(image) {
  image.style.animation = "winnerAnimation 1s ease";
  image.addEventListener("animationend", () => (image.style.animation = ""));
}
