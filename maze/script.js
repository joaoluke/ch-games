const mazeContainer = document.getElementById("maze");

// Defina o labirinto como um array multidimensional
// 0 = caminho, 1 = parede, 'S' = início, 'E' = fim
const mazeLayout = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 1, 0, 1, 1],
  ["S", 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, "E"],
  [1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const rows = mazeLayout.length;
const cols = mazeLayout[0].length;
let playerPosition = { row: 4, col: 0 }; // Posição inicial do jogador

// Função para gerar o labirinto baseado no array
function generateMaze() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (mazeLayout[row][col] === 1) {
        cell.classList.add("wall"); // Adiciona uma parede
      } else if (mazeLayout[row][col] === "S") {
        cell.classList.add("start");
        cell.id = "player"; // Marca a posição inicial do jogador
      } else if (mazeLayout[row][col] === "E") {
        cell.classList.add("end"); // Adiciona o ponto de chegada
      }

      mazeContainer.appendChild(cell);
    }
  }
}

// Função para mover o jogador
function movePlayer(newRow, newCol) {
  // Verifica se o movimento é válido (não é uma parede e está dentro dos limites)
  console.log("newCol", newCol);
  console.log("newRow", newRow);
  if (
    newRow >= 0 &&
    newRow < rows &&
    newCol >= 0 &&
    newCol < cols &&
    mazeLayout[newRow][newCol] !== 1
  ) {
    console.log("move");
    // Remove o jogador da posição antiga
    const oldCell = document.querySelector("#player");
    oldCell.removeAttribute("id");

    // Atualiza a posição do jogador
    playerPosition = { row: newRow, col: newCol };

    // Adiciona o jogador na nova célula
    const newCell = mazeContainer.children[newRow * cols + newCol];
    newCell.id = "player";

    // Verifica se o jogador chegou ao final
    if (mazeLayout[newRow][newCol] === "E") {
      alert("Você venceu!");
      resetGame();
    }
  }
}

// Função para resetar o jogo
function resetGame() {
  playerPosition = { row: 0, col: 0 };
  const oldCell = document.querySelector("#player");
  oldCell.removeAttribute("id");
  const startCell = mazeContainer.children[0];
  startCell.id = "player";
}

// Lógica de controle do jogador
window.addEventListener("keydown", (event) => {
  const { row, col } = playerPosition;

  if (event.key === "ArrowUp") {
    movePlayer(row - 1, col);
  } else if (event.key === "ArrowDown") {
    movePlayer(row + 1, col);
  } else if (event.key === "ArrowLeft") {
    console.log("left");
    movePlayer(row, col - 1);
  } else if (event.key === "ArrowRight") {
    console.log("right");

    movePlayer(row, col + 1);
  }
});

// Gera o labirinto no carregamento da página
generateMaze();
