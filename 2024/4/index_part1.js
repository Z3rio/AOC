import path from "node:path"
import { readFileSync } from "node:fs"

const cwd = process.cwd();
const data = readFileSync(path.join(cwd, "data.txt")).toString().trim()
const map = data.split(/\r?\n/).map((v) => v.split(""))
let result = 0

for (let i = 0; i < map.length; i++) {
  const line = map[i]

  for (let i2 = 0; i2 < line.length; i2++) {
    // no need to test if there's no room for diagonal ine
    if (i + 3 <= map.length && i2 + 3 <= line.length) {
      let diagonalTestLeftToRight = ""
      let diagonalTestRightToLeft = ""

      for (let i3 = 0; i3 < 3; i3++) {
        diagonalTestLeftToRight = diagonalTestLeftToRight + map[i + i3][i2 + i3].toUpperCase()
        diagonalTestRightToLeft = diagonalTestRightToLeft + map[i + i3][i2 + (2 - i3)].toUpperCase()
      }

      if (
        (diagonalTestLeftToRight === "MAS" || diagonalTestLeftToRight === "SAM") &&
        (diagonalTestRightToLeft === "MAS" || diagonalTestRightToLeft === "SAM")
      ) {
        result = result + 1
      }
    }
  }
}

console.log("Result: " + result)
