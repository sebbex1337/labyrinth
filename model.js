export async function getMaze() {
  const res = await fetch("maze.json");
  const maze = await res.json();
  return maze;
}
