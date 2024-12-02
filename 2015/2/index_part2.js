import path from "node:path"
import { readFileSync } from "node:fs"

const cwd = process.cwd();
const lines = readFileSync(path.join(cwd, "data.txt")).toString().trim().split(/\r?\n/)
let retVal = 0

for (let i = 0; i < lines.length; i++) {
  const splits = lines[i].split("x").map(Number).sort((a, b) => {
    if (a > b) {
      return 1
    }
    if (a < b) {
      return -1
    }

    return 0
  })

  retVal = retVal + splits[0] * 2 + splits[1] * 2 + (splits.reduce((prev, curr) => prev * curr, 1))
}

console.log("Result: " + retVal.toString())
