import * as view from "./view.js";
import { Grid } from "./grid.js";
import { Stack } from "./stack.js";
import * as model from "./model.js";

window.addEventListener("load", init);

// prettier-ignore
const DIRECTIONS = [
  "north",
  "south",
  "east",
  "west",
]

async function init() {
  const mazeData = await model.getMaze();
  grid = new Grid(mazeData.rows, mazeData.cols);
  loop(mazeData);
}

let grid;

function loop(mazeData) {
  resetGrid(mazeData);
  dfs(grid, mazeData);
}

function resetGrid(mazeData) {
  const clonedLabyrinth = structuredClone(mazeData);
  clonedLabyrinth.maze.forEach((row) => {
    row.forEach((cell) => {
      grid.set(cell.row, cell.col, cell);
    });
  });
  view.initGrid(grid);
  view.displayStartAndGoal(mazeData);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function dfs(grid, mazeData) {
  const route = new Stack();
  // Find the start and goal cells
  const goal = grid.get(mazeData.goal.row, mazeData.goal.col);
  // Current will always start at start (nice sentence??)
  let current = grid.get(mazeData.start.row, mazeData.start.col);
  // Push the start to the stack since we start here (again nice sentence??)
  route.push(current);

  while (current.row !== goal.row || current.col !== goal.col) {
    current.visited = true;
    view.displayGrid(grid);

    console.group("Current cell");
    console.log(current);
    console.groupEnd();

    let deadEnd = true;

    const neighbours = {
      north: grid.get(current.row - 1, current.col), // Tjek op ved at trække 1 fra row (altså går op i 2d arrayet)
      south: grid.get(current.row + 1, current.col), // Tjek ned ved at lægge 1 til row (altså går ned i 2d arrayet)
      east: grid.get(current.row, current.col + 1), // Tjek højre ved at lægge 1 til col (altså går til højre i 2d arrayet)
      west: grid.get(current.row, current.col - 1), // Tjek venstre ved at trække 1 fra col (altså går til venstre i 2d arrayet)
    };
    // Tjek hver retning med neighbours objektet
    for (const direction of DIRECTIONS) {
      // Få fat i den nabo ud fra nuværende retning
      const neighbour = neighbours[direction];
      // Hvis nuværende retning er falsk (Det vil sige at der ikke er en væg) og naboen ikke er besøgt
      if (!current[direction] && !neighbour?.visited) {
        // Vi går til naboen
        current = neighbour;
        // Vi tilføjer naboen til routen
        route.push(neighbour);
        // Det var ikke en dead end så derfor false
        deadEnd = false;
        // Break så vi tjekker næste retning
        break;
      }
    }
    if (deadEnd) {
      // Hvis det er en dead end så popper vi den sidste fra routen
      const deadEnd = route.pop();
      // Markerer den som en dead end
      view.deadEnd(deadEnd.row, deadEnd.col);
      view.displayGrid(grid);
      // Sætter current til at være den sidste i routen
      current = route.peek();
    }
    await delay(250);

    if (route.size() === 0) {
      console.log("No path found");
    }
  }
  goal.visited = true;
  view.displayGrid(grid);
}
