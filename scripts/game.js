document.addEventListener('DOMContentLoaded', () => {
  const classicButton = document.getElementById('classic-button');
  const customButton = document.getElementById('custom-button');
  const numPlayersInput = document.getElementById('num-players');
  const numDecksInput = document.getElementById('num-decks');
  const startGameButton = document.getElementById('start-game-button');
  const colorBlindModeInput = document.getElementById('color-blind-mode');
  const musicToggleInput = document.getElementById('music-toggle');
  
  const passButton = document.getElementById('pass-button');
  const bluffButton = document.getElementById('bluff-button');
  const putInPileButton = document.getElementById('put-in-pile-button');
  
  const handDiv = document.querySelector('.hand');
  const centerPileDiv = document.querySelector('.center-pile');
  const timerDiv = document.querySelector('.circular-timer');
  
  let players = [];
  let currentPlayerIndex = 0;
  let timer;
  let isGameStarted = false;
  let cardsInPlay = [];
  
  classicButton.addEventListener('click', () => {
    setupGameMode('classic');
  });
  
  customButton.addEventListener('click', () => {
    setupGameMode('custom');
  });

  numPlayersInput.addEventListener('input', validateStartButton);
  numDecksInput.addEventListener('input', validateStartButton);

  passButton.addEventListener('click', handlePass);
  bluffButton.addEventListener('click', handleBluff);
  putInPileButton.addEventListener('click', handlePutInPile);

  function setupGameMode(mode) {
    document.querySelector('.start-screen').style.display = 'none';
    document.querySelector('.game-screen').style.display = 'block';
    startGameButton.disabled = false;
    
    startGameButton.addEventListener('click', startGame);
    
    if (mode === 'classic') {
      numDecksInput.style.display = 'block';
    } else {
      numDecksInput.style.display = 'none';
    }
  }
  
  function startGame() {
    const numPlayers = parseInt(numPlayersInput.value);
    const numDecks = parseInt(numDecksInput.value);
    
    // Initialize players, deal cards, shuffle, etc.
    players = initializePlayers(numPlayers, numDecks);
    currentPlayerIndex = 0;
    
    isGameStarted = true;
    startRound();
  }
  
  function startRound() {
    const currentPlayer = players[currentPlayerIndex];
    handDiv.innerHTML = renderHand(currentPlayer.cards);
    
    startTimer();
  }

  function startTimer() {
    let timeLeft = 20;
    timer = setInterval(() => {
      timeLeft -= 1;
      timerDiv.textContent = `${timeLeft}s`;
      
      if (timeLeft <= 0) {
        clearInterval(timer);
        moveToNextPlayer();
      }
    }, 1000);
  }

  function moveToNextPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    startRound();
  }

  function handlePass() {
    // Handle pass logic, move to the next player.
    moveToNextPlayer();
  }

  function handleBluff() {
    // Handle bluff logic, check for challenge, etc.
    moveToNextPlayer();
  }

  function handlePutInPile() {
    // Logic for putting selected cards in the pile
    centerPileDiv.innerHTML += renderCards(cardsInPlay);
    cardsInPlay = [];
    moveToNextPlayer();
  }

  function validateStartButton() {
    const numPlayers = parseInt(numPlayersInput.value);
    const numDecks = parseInt(numDecksInput.value);
    startGameButton.disabled = numPlayers < 2 || numPlayers > 10 || numDecks < 1 || numDecks > 5;
  }

  function renderHand(cards) {
    return cards.map(card => `<div class="card">${card}</div>`).join('');
  }

  function renderCards(cards) {
    return cards.map(card => `<div class="card">${card}</div>`).join('');
  }

  function initializePlayers(numPlayers, numDecks) {
    // Initialize players, deal cards, shuffle decks, etc.
    const players = [];
    
    for (let i = 0; i < numPlayers; i++) {
      players.push({ id: i, name: `Player ${i+1}`, cards: dealCards(numDecks) });
    }

    return players;
  }

  function dealCards(numDecks) {
    const deck = [];
    for (let i = 0; i < numDecks; i++) {
      deck.push(...generateDeck());
    }
    return shuffle(deck).slice(0, Math.floor(deck.length / 10) * 2); // distribute cards evenly
  }

  function generateDeck() {
    const suits = ['♠', '♥', '♦', '♣'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];
    for (const suit of suits) {
      for (const value of values) {
        deck.push(`${value}${suit}`);
      }
    }
    return deck;
  }

  function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }
});
