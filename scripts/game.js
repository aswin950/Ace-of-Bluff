let players = [];
let currentPlayerIndex = 0;
let gameActive = false;
let deck = [];
let playerCards = [];
let avatars = [];

// Avatar API URL
const AVATAR_API = "https://randomuser.me/api/?results=1";

// Validate player name
function validatePlayerName(name) {
    const regex = /^[a-zA-Z0-9]{1,12}$/;
    return regex.test(name);
}

// Initialize the deck of cards (52 cards)
async function createDeck() {
    const suits = ['HEARTS', 'DIAMONDS', 'CLUBS', 'SPADES'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'];
    deck = [];
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({ suit, value });
        });
    });
}

// Shuffle the deck using Deck of Cards API
async function shuffleDeck() {
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const data = await response.json();
    return data.deck_id;
}

// Deal cards to players using images
async function dealCards() {
    const deckId = await shuffleDeck();
    playerCards = [];
    const numCards = 5; // Number of cards per player
    for (let i = 0; i < players.length; i++) {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numCards}`);
        const data = await response.json();
        playerCards[i] = data.cards;
    }
}

// Get random avatar for each player
async function getAvatar(playerIndex) {
    const response = await fetch(AVATAR_API);
    const data = await response.json();
    const avatarUrl = data.results[0].picture.large;
    avatars[playerIndex] = avatarUrl;
}

// Start game
async function startGame(playerNames) {
    if (playerNames.length < 2) {
        alert("At least 2 players are required to start the game!");
        return;
    }
    players = playerNames;
    currentPlayerIndex = 0;
    gameActive = true;
    await createDeck();
    await dealCards();
    displayGame();
}

// Display game table and players
function displayGame() {
    document.getElementById("initial-screen").style.display = 'none'; // Hide the initial screen
    const tableContainer = document.createElement("div");
    tableContainer.classList.add("table-container");

    // Show players in circular formation with cards
    const playerCardContainer = document.createElement("div");
    playerCardContainer.classList.add("player-card-container");
    players.forEach((player, index) => {
        const playerCard = document.createElement("div");
        playerCard.classList.add("card");
        playerCard.style.backgroundImage = `url(${playerCards[index][0].image})`; // First card image

        const playerAvatar = document.createElement("div");
        playerAvatar.classList.add("chair");
        const avatarImg = document.createElement("img");
        avatarImg.src = avatars[index];
        playerAvatar.appendChild(avatarImg);
        
        tableContainer.appendChild(playerAvatar);
        tableContainer.appendChild(playerCard);
    });

    document.body.appendChild(tableContainer);
}

// Set up game
document.getElementById("start-button").addEventListener("click", function() {
    const playerNames = [];
    const numPlayers = parseInt(document.getElementById("num-players").value);
    const playerInputs = document.querySelectorAll("#player-names input");
    playerInputs.forEach(input => {
        if (validatePlayerName(input.value)) {
            playerNames.push(input.value);
        }
    });

    if (playerNames.length < 2) {
        alert("Please enter at least 2 player names!");
        return;
    }

    getAvatar(); // Set avatars
    startGame(playerNames);
});
