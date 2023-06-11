'use strict';

//  Select elements 
const score0Element = document.querySelector("#score--0");
const score1Element = document.querySelector("#score--1");
const diceElement = document.querySelector(".dice");
const audioElement = document.getElementById("win-audio");
const current0Element = document.getElementById("current--0");
const current1Element = document.getElementById("current--1");
const rollDiceButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");
const resetButton = document.querySelector(".btn--new");
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");

// Create variable to hold the current score and active player 
// Create a variable to hold the condition of the game 
// Create an empty array to store the total score of each player 
let currentScore, currentPlayer, gamePlay, totalScore;

// Switch the player 
const playerSwitch = () => {

    // The case if the current player is player 1, switch to player 2
    if (currentPlayer === 0){
        currentPlayer = 1;

        // Assign the active player class to the current player 
        player1Element.classList.toggle("player--active");
        player0Element.classList.toggle("player--active");
    } else {
        currentPlayer = 0;
        player0Element.classList.toggle("player--active");
        player1Element.classList.toggle("player--active");
    }
}

// This method runs the game. One of the player roll the dice. 
let handleClick = () => {
    if (gamePlay === true){
        // Generate random number between 1 and 6
        const diceNumber1 = Math.floor(Math.random() * 6) + 1;

        // Display the random number 
        diceElement.classList.remove("hidden");
        diceElement.src = `image/dice-${diceNumber1}.png`;
        console.log(diceNumber1);

        // The case that the dice number is not equal to 1, add the number to the current score 
        if (diceNumber1 !== 1){
            currentScore += diceNumber1;

            // Dynamically Update and display the current score for the current player 
            document.querySelector(`#current--${currentPlayer}`).textContent = currentScore;
            
        // The case that the dice number is 1, automatically switch to the other player
        } else {
            document.querySelector(`#current--${currentPlayer}`).textContent = 0;
            currentScore = 0;
            playerSwitch();
        }
        // Add the 'roll' class to trigger the animation
        diceElement.classList.add('roll');

        // Remove the 'roll' class after the animation completes
        setTimeout(() => {
            diceElement.classList.remove('roll');
        }, 500);
    }
}
    
// This function is to hold the current score and add it to the total score
const holdClick = () => {
    if (gamePlay === true){   

        // To add the current score to the total score if the player click hold button
        totalScore[currentPlayer] += currentScore;

        // Dynamically update and display the total score for the current player
        document.querySelector(`#score--${currentPlayer}`).textContent = totalScore[currentPlayer];

        // Define a constant as the winning score. 
        const winningScore = 50;

        // Check if the player's score is >= 50, the player will win if so
        if (totalScore[currentPlayer] >= winningScore){
            document.querySelector(`.player--${currentPlayer}`).classList.toggle("player--winner"); 

            // Play the audio when the player wins 
            audioElement.play();

            [player0Element, player1Element].forEach(playerElement => {
                // Add the 'more' class to trigger the animation
                playerElement.classList.add('more');
            
                // Remove the 'more' class after the animation completes
                setTimeout(() => {
                    playerElement.classList.remove('more');
                }, 500);
            });

            // Set the game condition to false to end the game 
            gamePlay = false;

            diceElement.classList.add("hidden");
        } else{
                playerSwitch();

                // Reset the current score to 0
                currentScore = 0;
                totalScore[currentPlayer] += currentScore;
        }
    } 
}

// This function is to reboot the game
const newGame =() => {
    // Initialize the game condition
    currentPlayer = 0;
    gamePlay = true;
    audioElement.pause();
    currentScore = 0;
    totalScore =[0,0];

    // Hide the dice image
    diceElement.classList.add("hidden");

    // Reset PLAYER1 to be the active player 
    player0Element.classList.add("player--active");
    player1Element.classList.remove("player--active");
    player0Element.classList.remove("player--winner");
    player1Element.classList.remove("player--winner");

    // Reset the total score of each player to 0
    score0Element.textContent = 0;
    score1Element.textContent = 0;

    current0Element.textContent = 0;
    current1Element.textContent = 0;

    console.log("newGame function now starts");
}

// The main function to run the game 
const pigGame = () => {
    // Initialize the condition of the game
    newGame();

    // Activate event for each of the button
    rollDiceButton.addEventListener("click", handleClick);
    holdButton.addEventListener("click", holdClick);
    resetButton.addEventListener("click", newGame);
}

// Kick off the program 
pigGame();
