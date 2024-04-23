let array = new Array(10);
let isPlayer1=true;
let cellsWin = [];
let gameEnded = false;
let gameStarted = false;


function start() {
  if (gameStarted && !gameEnded) {
    document.getElementById('instruction').innerText = "Hãy chiến đấu hết mình!";
    return;
  }
   gameStarted = true;
  gameEnded = false;
  
  resetBoard();
  display();
}

function resetBoard() {
  cellsWin=[];
  for (let i = 0; i < array.length; i++) {
    array[i] = new Array(10);
    for (let j = 0; j < array[i].length; j++) {
      array[i][j] = "";
    }
  }
  display();
}

display();
function display() {
  let tableString = `<table>`;
  for (let i = 0; i<3; i++) {
    tableString += `<tr>`;
    for (let j = 0; j<3; j++) {
      if (cellsWin.includes(`${i}-${j}`)) {
      if (array[i][j]==="X") {
        tableString += `<td style="color:blue; background-color:lightgreen" onclick="play(${i},${j})">${array[i][j]}</td>`;
      } else if (array[i][j]==="O") {
        tableString += `<td style="color:red; background-color:lightgreen" onclick="play(${i},${j})">${array[i][j]}</td>`;
      } else {
        tableString += `<td onclick="play(${i},${j})">${array[i][j]}</td>`;
      }  
  } else {
      if (array[i][j]==="X") {
        tableString += `<td style=" color:blue" onclick="play(${i},${j})">${array[i][j]}</td>`;
      } else if (array[i][j]==="O") {
        tableString += `<td style="color:red" onclick="play(${i},${j})">${array[i][j]}</td>`;
      } else {
        tableString += `<td onclick="play(${i},${j})">${array[i][j]}</td>`;
      }
    }    
  }
  tableString += `</tr>`;
}
tableString += `</table>`;
  document.getElementById("result").innerHTML=tableString;
}
function play(i,j) {
  if (cellIsEmpty(i,j)) {
    if (isPlayer1) {
      array[i][j] ="X";
      isPlayer1 = false;
      if (checkWin("X")) {
        alert ("X thắng!!!")
        return;
      }
    } else {
      array[i][j] ="O";
      isPlayer1 = true;
      if (checkWin("O")) {
        alert ("O thắng!!!")
        return;
      }
    }
  } else {
    return;
    // alert("Ô này đã đánh rồi. Chọn lại ô khác")
  }
  display();
}
function cellIsEmpty(i,j) {
    return array[i][j]==="";
}
function checkWin(value) {
  for (let i = 0; i<array.length; i++) {
    for (let j = 0; j<array[i].length; j++) {
      let checkTX = array[i][j] === value
        && array[i+1][j] === value
        && array[i+2][j] === value;
      let checkTP = array[i][j] === value
        && array[i][j+1] === value
        && array[i][j+2] === value;
      let checkCTXTP = array[i][j] === value
        && array[i+1][j+1] === value
        && array[i+2][j+2] === value;
      let checkCTXPT = array[i][j] === value
        && array[i+1][j-1] === value
        && array[i+2][j-2] === value;  
      if (checkTX) {
          cellsWin.push(`${i}-${j}`);
          cellsWin.push(`${i+1}-${j}`);
          cellsWin.push(`${i+2}-${j}`);
        return true;
      }
      if (checkTP) {
        cellsWin.push(`${i}-${j}`);
        cellsWin.push(`${i}-${j+1}`);
        cellsWin.push(`${i}-${j+2}`);
        return true;
      }
      if (checkCTXTP) {
        cellsWin.push(`${i}-${j}`);
        cellsWin.push(`${i+1}-${j+1}`);
        cellsWin.push(`${i+2}-${j+2}`);
        return true;
      }
      if (checkCTXPT) {
        cellsWin.push(`${i}-${j}`);
        cellsWin.push(`${i+1}-${j-1}`);
        cellsWin.push(`${i+2}-${j-2}`);
        return true;
      }
    }
  }
  return false;
}
