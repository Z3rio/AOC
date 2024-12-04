import path from "node:path"
import { readFileSync } from "node:fs"

const cwd = process.cwd();
const chars = readFileSync(path.join(cwd, "data.txt")).toString().trim().split("")
let position = [0, 0]
let visitedHouses = ["0-0"]

for (const char of chars) {
  if (char === "^") {
    position[1] = position[1] + 1
  } else if (char === "v") {
    position[1] = position[1] - 1
  } else if (char === ">") {
    position[0] = position[0] + 1
  } else if (char === "<") {
    position[0] = position[0] - 1
  }

  const houseId = `${position[0]}-${position[1]}`

  if (!visitedHouses.includes(houseId)) {
    visitedHouses.push(houseId)
  }
}

console.log("Result: " + visitedHouses.length.toString())
