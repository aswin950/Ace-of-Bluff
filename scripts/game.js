let players = [];
let currentPlayerIndex = 0;
let gameActive = false;
let deck = [];
let playerCards = [];

// Initialize the deck of cards (52 cards)
function createDeck() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(response => response.json())
        .then(data => {
            deck = data.deck_id;
            dealCards();
        });
}

// Deal cards to players
function dealCards() {
    fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=10`) // 5 cards for each player
        .then(response => response.json())
        .then(data => {
            const cards = data.cards;
            playerCards = [cards.slice(0, 5), cards.slice(5, 10)]; // Split into 2 player hands
            displayPlayerCards();
        });
}

// Display the player's cards using images from the Deck of Cards API
function displayPlayerCards() {
    const statsContainer = document.getElementById("game-stats");
    statsContainer.innerHTML = ""; // Clear existing stats

    players.forEach((player, index) => {
        const playerStat = document.createElement("div");
        playerStat.innerText = `Player ${index + 1}: ${player}`;
        statsContainer.appendChild(playerStat);

        // Display each player's cards
        const cardsContainer = document.createElement("div");
        playerCards[index].forEach(card => {
            const cardImg = document.createElement("img");
            cardImg.src = card.image; // Get the image URL from the card object
            cardImg.alt = `${card.value} of ${card.suit}`;
            cardImg.style.marginRight = "10px";
            cardsContainer.appendChild(cardImg);
        });
        statsContainer.appendChild(cardsContainer);
    });

    // Display who's turn it is
    const turnIndicator = document.createElement("div");
    turnIndicator.innerText = `It's ${players[currentPlayerIndex]}'s turn!`;
    statsContainer.appendChild(turnIndicator);
}

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

    // Initialize the deck and deal the cards
    createDeck();
}

// Update player name input fields based on selected number of players
document.getElementById("num-players").addEventListener("change", function() {
    const numPlayers = parseInt(this.value);
    const playerNamesContainer = document.getElementById("player-names");
    playerNamesContainer.innerHTML = ""; // Clear any existing inputs

    // Create the required number of input fields for player names
    for (let i = 0; i < numPlayers; i++) {
        const playerInput = document.createElement("input");
        playerInput.setAttribute("type", "text");
        playerInput.setAttribute("placeholder", `Enter name for Player ${i + 1}`);
        playerNamesContainer.appendChild(playerInput);
    }
});

// Set up the initial state when the page is loaded
document.addEventListener("DOMContentLoaded", function() {
    const numPlayers = parseInt(document.getElementById("num-players").value);
    const playerNamesContainer = document.getElementById("player-names");

    // Create the initial input fields based on the default number of players
    for (let i = 0; i < numPlayers; i++) {
        const playerInput = document.createElement("input");
        playerInput.setAttribute("type", "text");
        playerInput.setAttribute("placeholder", `Enter name for Player ${i + 1}`);
        playerNamesContainer.appendChild(playerInput);
    }
});
