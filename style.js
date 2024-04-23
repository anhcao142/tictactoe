let array = new Array(3).fill(null).map(() => new Array(3).fill(""));
let isPlayer1 = true;
let cellsWin = [];
let gameEnded = false;
let gameStarted = false;

start();

function start() {
  if (!gameStarted || gameEnded) {
    gameStarted = true;
    gameEnded = false;
    resetBoard();
    display();
    document.getElementById('instruction').innerText = "Bấm bắt đầu để chơi";
  }
}

function resetBoard() {
  cellsWin = [];
  array = new Array(3).fill(null).map(() => new Array(3).fill(""));
  display();
  gameStarted = true;
  gameEnded = false;
}

function display() {
  let tableString = '<table style="table-layout: fixed; width: 300px; height: 300px; border-collapse: collapse;">';
  for (let i = 0; i < 3; i++) {
    tableString += '<tr>';
    for (let j = 0; j < 3; j++) {
      const cellStyle = cellsWin.includes(`${i}-${j}`) ? 'background-color:lightgreen;' : '';
      const textColor = array[i][j] === "X" ? 'color:blue;' : 'color:red;';
      tableString += `<td style="width: 100px; height: 100px; font-size: 1.2em; overflow: hidden; text-align: center; vertical-align: middle; border: 1px solid black; ${textColor} ${cellStyle}" onclick="play(${i},${j})">${array[i][j]}</td>`;
    }
    tableString += '</tr>';
  }
  tableString += '</table>';
  document.getElementById("result").innerHTML = tableString;
}

function play(i, j) {
  if (array[i][j] === "" && !gameEnded) {
    array[i][j] = isPlayer1 ? "X" : "O";
    isPlayer1 = !isPlayer1;
    if (checkWin(array[i][j])) {
      gameEnded = true;
      document.getElementById('game-result').innerText = `${array[i][j]} wins!!!`;
      display();
      return;
    }
  } else if (!gameEnded) {
    alert("This cell is already filled. Choose another one.");
  }
  display();
}

function checkWin(value) {
  const directions = [
    [1, 0], [0, 1], [1, 1], [1, -1]
  ];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let [dx, dy] of directions) {
        const line = [
          array[i][j],
          (array[i + dx] || [])[j + dy],
          (array[i + 2 * dx] || [])[j + 2 * dy]
        ];
        if (line.every(cell => cell === value)) {
          cellsWin.push(`${i}-${j}`, `${i + dx}-${j + dy}`, `${i + 2 * dx}-${j + 2 * dy}`);
          return true;
        }
      }
    }
  }
  return false;
}
