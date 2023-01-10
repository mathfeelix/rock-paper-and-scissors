// Array with options and what they beat
const options = [
  { name: "rock", beats: "scissors", beats_text: "Rock beats scissors!" },
  { name: "scissors", beats: "paper", beats_text: "Scissors beats paper!" },
  { name: "paper", beats: "rock", beats_text: "Paper beats rock!" },
];

// Variables for the images of the chosen options
// Global variables to use them for the click on the options
// and on the restart game function
const player_image = document.querySelector("#your-choice");
const computer_image = document.querySelector("#computer-choice");

// Variables with containers
// Global variables to use them for the click on the options,
// verifyGameWinner and restart game funtions
const final_result_box = document.getElementById("final-result-box");
const options_container = document.getElementById("options-container");
const winner_text_container = document.getElementById("winner-text-container");

// Scores of players
// Global variables to use them for the
// verifyMatchWinner and restart game funtions
const player_score = document.getElementById("player-score");
const computer_score = document.getElementById("computer-score");

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

    // Verifies who won the match
    const winner = verifyMatchWinner(
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
    winner_text_container.classList.remove("hidden");
  });
});

// Shows who the winner of the match is,
// increases their points,
// adds animation to the corresponding image
// and checks if there's a winner on the game
function verifyMatchWinner(
  player_choice,
  computer_choice,
  player_image,
  computer_image
) {
  // Winner text
  const winner_text = document.getElementById("winner-text");

  if (player_choice.beats === computer_choice.name) {
    winner_text.innerText = "You won...";
    player_score.innerText = parseInt(player_score.innerText) + 1;
    addWinnerAnimation(player_image);
    verifyGameWinner(
      parseInt(player_score.innerText),
      "You're a winner, baby!"
    );
    return player_choice;
  } else if (computer_choice.beats === player_choice.name) {
    winner_text.innerText = "You lost...";
    computer_score.innerText = parseInt(computer_score.innerText) + 1;
    addWinnerAnimation(computer_image);
    verifyGameWinner(
      parseInt(computer_score.innerText),
      "You lost, sashay away..."
    );
    return computer_choice;
  } else {
    // In case of a draw
    winner_text.innerText = "It's a draw!";
    return null;
  }
}

// Verifies if there's a winner on the game
// The winner is the first to score 5 points
function verifyGameWinner(score, text) {
  if (score === 5) {
    // Shows the Final Result box and enables the Restart button
    final_result_box.classList.remove("hidden", "pointer-events-none");
    document.getElementById("final-result-text").innerText = text;

    // Removes click events from the options to stop the game
    options_container.classList.add("pointer-events-none");
  }
}

// Event Listener for the Restart button
// Hides the Final Result box
// and resets images, texts and score
document.getElementById("restart").addEventListener("click", () => {
  final_result_box.classList.add("hidden", "pointer-events-none");
  options_container.classList.remove("pointer-events-none");
  player_image.classList.add("hidden");
  computer_image.classList.add("hidden");
  winner_text_container.classList.add("hidden");
  player_score.innerText = "0";
  computer_score.innerText = "0";
});

// Randomly chooses a number from 0 to 2
// and returns the corresponding item from the array Options
function selectComputerChoice() {
  return options[(number = Math.floor(Math.random() * 3))].name;
}

// Adds animation to the winner image
// and removes it when it's finished to reset it
function addWinnerAnimation(image) {
  image.style.animation = "winnerAnimation 1s ease";
  image.addEventListener("animationend", () => (image.style.animation = ""));
}
