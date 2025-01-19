let players = [];
let currentPlayerIndex = 0;
let gameActive = false;
let deck = [];
let playerCards = [];

// Card Deck Setup
const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];

// Create a deck of 52 cards
function createDeck() {
    deck = [];
    suits.forEach(suit => {
        ranks.forEach(rank => {
            deck.push({ rank, suit });
        });
    });
    shuffleDeck();
}

// Shuffle the deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Deal 5 cards to each player
function dealCards(numPlayers) {
    playerCards = [];
    for (let i = 0; i < numPlayers; i++) {
        playerCards[i] = [];
        for (let j = 0; j < 5; j++) {
            playerCards[i].push(deck.pop());
        }
    }
}

// Display player stats and cards
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

// Display the cards each player has
function displayPlayerCards() {
    const cardsContainer = document.getElementById("game-cards");
    cardsContainer.innerHTML = ""; // Clear previous cards display

    playerCards.forEach((cards, index) => {
        const playerDiv = document.createElement("div");
        playerDiv.innerHTML = `<strong>${players[index]}'s Cards:</strong><ul>`;
        cards.forEach(card => {
            playerDiv.innerHTML += `<li>${card.rank} of ${card.suit}</li>`;
        });
        playerDiv.innerHTML += `</ul>`;
        cardsContainer.appendChild(playerDiv);
    });
}

// Dynamic player name inputs based on number of players
document.getElementById("num-players").addEventListener("change", function() {
    const numPlayers = parseInt(this.value);
    const playerNamesContainer = document.getElementById("player-names");
    playerNamesContainer.innerHTML = ""; // Clear existing inputs

    // Show input fields for player names only when number of players is selected
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

    // Initialize the game
    createDeck();
    dealCards(players.length);
    gameActive = true;
    displayStats();
    displayPlayerCards();
});

// Show how to play rules
document.getElementById("rules-button").addEventListener("click", function() {
    document.getElementById("rules-modal").style.display = "flex";
});

document.getElementById("close-rules").addEventListener("click", function() {
    document.getElementById("rules-modal").style.display = "none";
});

// Passing turn logic
function passTurn() {
    if (gameActive) {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        displayStats();
        displayPlayerCards();
    }
}
