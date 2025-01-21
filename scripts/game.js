document.addEventListener('DOMContentLoaded', () => {
  const classicButton = document.getElementById('classic-multiplayer');
  const setupScreen = document.getElementById('setup-screen');
  const mainScreen = document.getElementById('main-screen');
  const setupForm = document.getElementById('setup-form');
  const numPlayersSelect = document.getElementById('num-players');
  const numDecksSelect = document.getElementById('num-decks');
  const startGameButton = document.getElementById('start-game');
  const copyRoomLinkButton = document.getElementById('copy-room-link');
  const gameScreen = document.getElementById('game-screen');
  const roomNameInput = document.getElementById('room-name');
  const usernameInput = document.getElementById('player-username');
  const colorBlindModeCheckbox = document.getElementById('color-blind-mode');

  let roomName = '';
  let players = [];
  let currentPlayerIndex = 0;
  let centerPile = [];

  /**
   * Generate a unique room name.
   */
  function generateRoomName(baseName) {
    const uniqueSuffix = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${baseName}-${uniqueSuffix}`;
  }

  /**
   * Enable or disable the Start Game button.
   */
  function updateStartButtonState() {
    const roomNameValid = roomNameInput.value.trim().length > 0;
    const usernameValid = usernameInput.value.trim().length > 0;
    const playersValid = numPlayersSelect.value !== '';
    startGameButton.disabled = !(roomNameValid && usernameValid && playersValid);
  }

  /**
   * Copy the room link to the clipboard.
   */
  function copyRoomLink() {
    const roomLink = `${window.location.origin}?room=${roomName}`;
    navigator.clipboard.writeText(roomLink).then(() => {
      alert('Room link copied!');
    });
  }

  /**
   * Start the game: transition to the game screen, deal cards, and initialize the game state.
   */
  function startGame() {
    roomName = generateRoomName(roomNameInput.value.trim());
    players.push({ username: usernameInput.value.trim(), cards: [] });
    mainScreen.classList.add('hidden');
    setupScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    dealCards();
    startPlayerTurn();
  }

  /**
   * Distribute cards to players based on the selected number of decks.
   */
  function dealCards() {
    const numPlayers = parseInt(numPlayersSelect.value, 10);
    const numDecks = parseInt(numDecksSelect.value, 10);
    const totalCards = numDecks * 52;
    const cardsPerPlayer = Math.floor(totalCards / numPlayers);
    const extraCards = totalCards % numPlayers;

    // Create the deck and shuffle it
    let deck = [];
    for (let i = 0; i < numDecks; i++) {
      for (let suit of ['♥', '♦', '♣', '♠']) {
        for (let rank = 1; rank <= 13; rank++) {
          deck.push(`${rank}${suit}`);
        }
      }
    }
    deck = deck.sort(() => Math.random() - 0.5);

    // Distribute cards
    for (let i = 0; i < numPlayers; i++) {
      players[i] = {
        username: i === 0 ? usernameInput.value.trim() : `Player ${i + 1}`,
        cards: deck.splice(0, cardsPerPlayer + (i < extraCards ? 1 : 0)),
      };
    }
  }

  /**
   * Start the current player's turn.
   */
  function startPlayerTurn() {
    const currentPlayer = players[currentPlayerIndex];
    document.getElementById('current-player').textContent = `${currentPlayer.username}, it's your turn!`;
    // Initialize the timer and handle turn-specific logic here
  }

  classicButton.addEventListener('click', () => {
    mainScreen.classList.add('hidden');
    setupScreen.classList.remove('hidden');
  });

  // Update the number of decks based on player count
  numPlayersSelect.addEventListener('change', () => {
    const numPlayers = parseInt(numPlayersSelect.value, 10);
    if (numPlayers >= 5) {
      numDecksSelect.disabled = false;
    } else {
      numDecksSelect.value = '2';
      numDecksSelect.disabled = true;
    }
    updateStartButtonState();
  });

  // Enable or disable the Start Game button on input changes
  roomNameInput.addEventListener('input', updateStartButtonState);
  usernameInput.addEventListener('input', updateStartButtonState);

  // Copy room link
  copyRoomLinkButton.addEventListener('click', copyRoomLink);

  // Start the game
  setupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    startGame();
  });
});
