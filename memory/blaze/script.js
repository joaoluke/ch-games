const gameContainer = document.querySelector(".game-container");

// Array de imagens das cartas (dois de cada)
const cardImages = [
  "blaze.png",
  "pickle.png",
  "starla.png",
  "stripes.png",
  "zeg.png",
  "crusher.png",
  "blaze.png",
  "pickle.png",
  "starla.png",
  "stripes.png",
  "zeg.png",
  "crusher.png",
];

// Função para gerar as cartas dinamicamente
function generateCards() {
  cardImages.forEach((image) => {
    // Cria o container da carta
    const card = document.createElement("div");
    card.classList.add("card");

    // Cria a estrutura interna para frente e verso
    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");

    // Adiciona a imagem na frente da carta
    const img = document.createElement("img");
    img.src = `../images/blaze/${image}`;
    img.className = "person";
    cardFront.appendChild(img);

    // Adiciona frente e verso à carta
    cardInner.appendChild(cardBack); // Adiciona o verso primeiro
    cardInner.appendChild(cardFront); // Adiciona a frente depois
    card.appendChild(cardInner);

    // Adiciona o nome da carta ao dataset (para verificação de correspondência)
    card.dataset.name = image;

    // Adiciona a lógica de virar a carta
    card.addEventListener("click", flipCard);

    // Adiciona a carta ao container
    gameContainer.appendChild(card);
  });
}

// Lógica do jogo (igual ao exemplo anterior)
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.name === secondCard.dataset.name) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  resetBoard();
  checkVictory();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Embaralhar cartas
(function shuffle() {
  cardImages.sort(() => 0.5 - Math.random());
})();

// Função que verifica se o jogador venceu
function checkVictory() {
  const matchedCards = document.querySelectorAll(".matched").length;
  if (matchedCards === cardImages.length) {
    // Redireciona para a página de vitória
    setTimeout(() => {
      window.location.href = "victory.html";
    }, 500); // Pequeno atraso para dar tempo de ver a última carta virada
  }
}

// Gera as cartas e adiciona eventos
generateCards();
