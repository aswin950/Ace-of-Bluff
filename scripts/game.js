document.addEventListener('DOMContentLoaded', () => {
  const classicButton = document.getElementById('classic-multiplayer');
  const customButton = document.getElementById('custom-game');
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

  function generateRoomName(baseName) {
    const uniqueSuffix = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${baseName}-${uniqueSuffix}`;
  }

  function updateDeckOptions() {
    const numPlayers = parseInt(numPlayersSelect.value, 10);
    if (numPlayers >= 5) {
      numDecksSelect.disabled = false;
    } else {
      numDecksSelect.value = '2';
      numDecksSelect.disabled = true;
    }
  }

  function copyRoomLink() {
    const roomLink = `${window.location.origin}?room=${roomName}`;
    navigator.clipboard.writeText(roomLink).then(() => {
      alert('Room link copied!');
    });
  }

  function startGame() {
    roomName = generateRoomName(roomNameInput.value);
    players.push({ username: usernameInput.value, cards: [] });
    mainScreen.classList.add('hidden');
    setupScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    dealCards();
    startPlayerTurn();
  }

  function dealCards() {
    // Logic to deal cards among players based on the selected number of decks
    // and distribute any extra cards evenly among players
  }

  function startPlayerTurn() {
    const currentPlayer = players[currentPlayerIndex];
    document.getElementById('current-player').textContent = `${currentPlayer.username}, it's your turn!`;
    // Start a timer and provide options to play, pass, or bluff
  }

  classicButton.addEventListener('click', () => {
    mainScreen.classList.add('hidden');
    setupScreen.classList.remove('hidden');
  });

  numPlayersSelect.addEventListener('change', updateDeckOptions);
  copyRoomLinkButton.addEventListener('click', copyRoomLink);
  setupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    startGame();
  });
});
