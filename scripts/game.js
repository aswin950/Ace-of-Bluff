let players = [];
let currentPlayerIndex = 0;
let gameActive = false;

// Dynamic player name inputs based on number of players
document.getElementById("num-players").addEventListener("change", function() {
    const numPlayers = parseInt(this.value);
    const playerNamesContainer = document.getElementById("player-names");
    playerNamesContainer.innerHTML = ""; // Clear existing inputs

    for (let i = 0; i < numPlayers; i++) {
        const playerInput = document.createElement("input");
        playerInput.setAttribute("type", "text");
        playerInput.setAttribute("placeholder", `Enter name for Player ${i + 1}`);
        playerNamesContainer.appendChild(playerInput);
    }
});

// Start the game with player names and number of players
document.getElementById("start-button").addEventListener("click", function() {
    const numPlayers = parseInt(document.getElementById("num-players").value);
    const playerInputs = document.querySelectorAll("#player-names input");
    
    // Collect player names
    players = [];
    playerInputs.forEach(input => {
        if (input.value.trim() !== "") {
            players.push(input.value.trim());
        }
    });

    if (players.length < 2) {
        alert("Please enter at least 2 player names!");
        return;
    }

    // Start the game
    startGame(players);
});

// Show how to play rules
document.getElementById("rules-button").addEventListener("click", function() {
    document.getElementById("rules-modal").style.display = "flex";
});

document.getElementById("close-rules").addEventListener("click", function() {
    document.getElementById("rules-modal").style.display = "none";
});

// Game start function
function startGame(playerNames) {
    if (playerNames.length < 2) {
        alert("At least 2 players are required to start the game!");
        return;
    }

    players = playerNames;
    currentPlayerIndex = 0;
    gameActive = true;

    // Display the player stats
    displayStats();
}

// Display player stats (e.g., names, current turn)
function displayStats() {
    const statsContainer = document.getElementById("game-stats");
    statsContainer.innerHTML = ""; // Clear existing stats

    players.forEach((player, index) => {
        const playerStat = document.createElement("div");
        playerStat.innerText = `Player ${index + 1}: ${player}`;
        statsContainer.appendChild(playerStat);
    });

    // Display who's turn it is
    const turnIndicator = document.createElement("div");
    turnIndicator.innerText = `It's ${players[currentPlayerIndex]}'s turn!`;
    statsContainer.appendChild(turnIndicator);
}

// Passing turn logic
function passTurn() {
    if (gameActive) {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        displayStats();
}

// Optionally, add other game logic here (card handling, bluffing, etc.)