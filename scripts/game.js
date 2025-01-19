let gameMode = '';
let numPlayers = 2;
let numDecks = 2;
let players = [];
let currentPlayerIndex = 0;

function selectMode(mode) {
  gameMode = mode;
  document.getElementById('player-selection').style.display = 'block';
  if (mode === 'classic') {
    document.getElementById('deck-selection').style.display = 'none';
  } else if (mode === 'custom') {
    document.getElementById('deck-selection').style.display = 'block';
  }
  updateStartButtonState();
}

function updateStartButtonState() {
  numPlayers = parseInt(document.getElementById('num-players').value);
  numDecks = parseInt(document.getElementById('num-decks').value);

  // Enable "Start Game" button if the number of players is valid (2 to 10)
  const startButton = document.getElementById('start-game');
  if (numPlayers >= 2 && numPlayers <= 10) {
    startButton.disabled = false;
  } else {
    startButton.disabled = true;
  }
}

function startGame() {
  // Hide start screen, show game screen
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('game-screen').style.display = 'block';

  // Initialize players and their cards
  initializePlayers();
  dealCards();
}

function initializePlayers() {
  // Create avatars and initialize player hands
  for (let i = 0; i < numPlayers; i++) {
    const player = {
      id: i + 1,
      name: `Player ${i + 1}`,
      avatar: `https://api.adorable.io/avatars/285/${i + 1}.png`,  // Example Avatar API
      hand: [],
    };
    players.push(player);

    const playerDiv = document.createElement('div');
    playerDiv.classList.add('player');
    playerDiv.innerHTML = `
      <img src="${player.avatar}" alt="${player.name} Avatar">
      <div class="hand" id="player-${i + 1}-hand">
        <!-- Cards for this player will be displayed here -->
      </div>
    `;
    document.getElementById('players').appendChild(playerDiv);
  }
}

function dealCards() {
  // Example logic to distribute cards among players and adjust for extra cards
  const deck = generateDeck(numDecks);
  shuffleDeck(deck);

  let cardIndex = 0;
  let extraCards = deck.length % numPlayers;
  for (let i = 0; i < numPlayers; i++) {
    players[i].hand = deck.slice(cardIndex, cardIndex + 19);
    cardIndex += 19;
    if (i < extraCards) {
      players[i].hand.push(deck[cardIndex++]); // Distribute extra cards to some players
    }
    updatePlayerHandDisplay(i);
  }
}

function generateDeck(numDecks) {
  const suits = ['♠', '♣', '♦', '♥'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  let deck = [];
  for (let i = 0; i < numDecks; i++) {
    for (let suit of suits) {
      for (let value of values) {
        deck.push(`${value}${suit}`);
      }
    }
  }
  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
  }
}

function updatePlayerHandDisplay(playerIndex) {
  const player = players[playerIndex];
  const handDiv = document.getElementById(`player-${playerIndex + 1}-hand`);
  handDiv.innerHTML = ''; // Clear existing hand
  player.hand.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.textContent = card;
    handDiv.appendChild(cardElement);
  });
}

// Example placeholder functions for game actions
function passTurn() {
  console.log('Pass turn');
}

function bluff() {
  console.log('Bluff!');
}

function putInPile() {
  console.log('Put in pile');
}
