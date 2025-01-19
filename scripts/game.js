let players = [];
let currentPlayerIndex = 0;
let gameActive = false;
let deck = [];
let playerCards = [];

// Dynamic player name inputs based on number of players
document.getElementById("num-players").addEventListener("change", function () {
    const numPlayers = parseInt(this.value);
    const playerNamesContainer = document.getElementById("player-names");
    playerNamesContainer.innerHTML = ""; // Clear existing inputs

    // Display input fields based on selected number of players
    for (let i = 0; i < numPlayers; i++) {
        const playerInput = document.createElement("input");
        playerInput.setAttribute("type", "text");
        playerInput.setAttribute("placeholder", `Enter name for Player ${i + 1}`);
        playerNamesContainer.appendChild(playerInput);
    }

    // Enable the start button if there are valid inputs
    document.getElementById("start-button").disabled = false;
});

// Start the game with player names and number of players
document.getElementById("start-button").addEventListener("click", function () {
    const numPlayers = parseInt(document.getElementById("num-players").value);
    const playerInputs = document.querySelectorAll("#player-names input");

    // Collect player names
    players = [];
    playerInputs.forEach(input => {
        if (input.value.trim() !== "") {
            // Ensure that names are valid (alphanumeric, max 12 chars)
            if (/^[a-zA-Z0-9]{1,12}$/.test(input.value)) {
                players.push(input.value.trim());
            } else {
                alert("Player names must be alphanumeric and less than 12 characters.");
                return;
            }
        }
    });

    // Check if there are enough players (at least 2)
    if (players.length < 2) {
        alert("Please enter at least 2 player names!");
        return;
    }

    // Hide the initial screen and show the game screen
    document.getElementById("initial-screen").style.display = "none";
    document.getElementById("game-container").style.display = "block";

    // Start the game
    startGame(players);
});

// Show how to play rules
document.getElementById("rules-button").addEventListener("click", function () {
    document.getElementById("rules-modal").style.display = "flex";
});

document.getElementById("close-rules").addEventListener("click", function () {
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

    // Initialize the deck, shuffle it, and deal the cards
    createDeck();
    shuffleDeck();
    dealCards();

    // Display the player stats and cards
    displayPlayerCards();
}

// Initialize the deck of cards
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
    for (let i = 0; i < players.length; i++) {
        playerCards[i] = [];
        for (let j = 0; j < numCards; j++) {
            playerCards[i].push(deck.pop()); // Deal a card
        }
    }
}

// Display player cards (Images and player names)
function displayPlayerCards() {
    const tableContainer = document.querySelector(".table-container");
    tableContainer.innerHTML = ""; // Clear existing cards

    players.forEach((player, index) => {
        const playerDiv = document.createElement("div");
        playerDiv.classList.add("player-card");

        // Avatar image for the player
        const avatarImg = document.createElement("img");
        avatarImg.src = `https://avatars.dicebear.com/api/human/${player}.svg`; // Random avatar
        playerDiv.appendChild(avatarImg);

        // Display each player's cards
        const cardsContainer = document.createElement("div");
        cardsContainer.classList.add("cards");
        playerCards[index].forEach(card => {
            const cardImg = document.createElement("img");
            cardImg.src = `https://deckofcardsapi.com/static/img/${card.value[0]}${card.suit[0]}.png`;
            cardsContainer.appendChild(cardImg);
        });
        playerDiv.appendChild(cardsContainer);
        tableContainer.appendChild(playerDiv);
    });

    // Display who's turn it is
    const turnIndicator = document.createElement("div");
    turnIndicator.innerText = `It's ${players[currentPlayerIndex]}'s turn!`;
    turnIndicator.classList.add("turn-indicator");
    document.getElementById("game-stats").appendChild(turnIndicator);
}

// Passing turn logic
function passTurn() {
    if (gameActive) {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        displayPlayerCards();
    }
}

// Optionally, add other game logic here (card handling, bluffing, etc.)

// End game request logic
function requestEndGame() {
    // Show the end game notification for the other player
    const notification = document.getElementById("cloud-notification");
    notification.innerText = `${players[currentPlayerIndex]} has requested to end the game.`;
    notification.style.display = "block";
}

// Close end game notification
function closeEndGameNotification() {
    document.getElementById("cloud-notification").style.display = "none";
}
