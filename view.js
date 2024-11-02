export function initGrid(grid) {
  document.documentElement.style.setProperty("--row-num", grid.rowsNum);
  document.documentElement.style.setProperty("--col-num", grid.colsNum);
  const labyrinth = document.querySelector("#maze");
  labyrinth.innerHTML = "";
  for (let row = 0; row < grid.rowsNum; row++) {
    for (let col = 0; col < grid.colsNum; col++) {
      const cell = grid.get(row, col);
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      if (cell?.north) {
        cellDiv.classList.add("wall");
        cellDiv.classList.add("north");
      }
      if (cell?.south) {
        cellDiv.classList.add("wall");
        cellDiv.classList.add("south");
      }
      if (cell?.west) {
        cellDiv.classList.add("wall");
        cellDiv.classList.add("west");
      }
      if (cell?.east) {
        cellDiv.classList.add("wall");
        cellDiv.classList.add("east");
      }
      cellDiv.setAttribute("row", row);
      cellDiv.setAttribute("col", col);
      labyrinth.appendChild(cellDiv);
    }
  }
}

export function displayGrid(grid) {
  for (let row = 0; row < grid.rowsNum; row++) {
    for (let col = 0; col < grid.colsNum; col++) {
      const cell = grid.get(row, col);
      const cellDiv = document.querySelector(`.cell[row="${row}"][col="${col}"]`);
      if (cell?.visited) {
        cellDiv.classList.add("visited");
      }
    }
  }
}

export function displayStartAndGoal(labyrinth) {
  const start = document.querySelector(`.cell[row="${labyrinth.start.row}"][col="${labyrinth.start.col}"]`);
  const goal = document.querySelector(`.cell[row="${labyrinth.goal.row}"][col="${labyrinth.goal.col}"]`);
  start.classList.add("start");
  goal.classList.add("goal");
  start.innerHTML = "start";
  goal.innerHTML = "goal";
}

export function deadEnd(row, col) {
  const cellDiv = document.querySelector(`.cell[row="${row}"][col="${col}"]`);
  cellDiv.classList.add("dead-end");
}
