let players = [];
let currentPlayerIndex = 0;
let gameActive = false;
let deck = [];
let playerCards = [];

// Initialize the deck of cards (52 cards)
function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    deck = [];
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({ suit, value });
        });
    });
}

// Shuffle the deck using Fisher-Yates algorithm
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
    }
}

// Deal cards to players
function dealCards() {
    playerCards = [];
    const numCards = 5; // Number of cards per player
    // Initialize player hands
    for (let i = 0; i < players.length; i++) {
        playerCards[i] = [];
        for (let j = 0; j < numCards; j++) {
            playerCards[i].push(deck.pop()); // Deal a card
        }
    }
}

// Display the player's cards on the screen
function displayPlayerCards() {
    const statsContainer = document.getElementById("game-stats");
    statsContainer.innerHTML = ""; // Clear existing stats

    players.forEach((player, index) => {
        const playerStat = document.createElement("div");
        playerStat.innerText = `Player ${index + 1}: ${player}`;
        statsContainer.appendChild(playerStat);

        // Display each player's cards
        const cardsContainer = document.createElement("div");
        cardsContainer.innerText = `Cards: ${playerCards[index].map(card => `${card.value} of ${card.suit}`).join(', ')}`;
        statsContainer.appendChild(cardsContainer);
    });

    // Display who's turn it is
    const turnIndicator = document.createElement("div");
    turnIndicator.innerText = `It's ${players[currentPlayerIndex]}'s turn!`;
    statsContainer.appendChild(turnIndicator);
}

// Game start function
function startGame(playerNames) {
    if (playerNames.length < 2) {
        alert("At least 2 players are required to start the game!");
        return;
    }

    players = playerNames;
    currentPlayerIndex = 0;
    gameActive = true;

    // Initialize the deck, shuffle it, and deal the cards
    createDeck();
    shuffleDeck();
    dealCards();

    // Display the player stats and cards
    displayPlayerCards();
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
