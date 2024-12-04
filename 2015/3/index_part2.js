import path from "node:path"
import { readFileSync } from "node:fs"

const cwd = process.cwd();
const chars = readFileSync(path.join(cwd, "data.txt")).toString().trim().split("")
let position = {
  robot: [0, 0],
  santa: [0, 0]
}
let visitedHouses = ["0-0"]

for (let i = 0; i < chars.length; i++) {
  const char = chars[i]
  const type = i % 2 === 0 ? "santa" : "robot"

  if (char === "^") {
    position[type][1] = position[type][1] + 1
  } else if (char === "v") {
    position[type][1] = position[type][1] - 1
  } else if (char === ">") {
    position[type][0] = position[type][0] + 1
  } else if (char === "<") {
    position[type][0] = position[type][0] - 1
  }

  const houseId = `${position[type][0]}-${position[type][1]}`

  if (!visitedHouses.includes(houseId)) {
    visitedHouses.push(houseId)
  }
}

console.log("Result: " + visitedHouses.length.toString())

