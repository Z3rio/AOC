import path from "node:path"
import { readFileSync } from "node:fs"

const cwd = process.cwd();
const data = readFileSync(path.join(cwd, "data.txt")).toString().trim()
const matches = data.match(/(mul\(\d+,\d+\))|(do(n\'t)?\(\))/g)
let allowMultiplication = true
let retVal = 0

for (const match of matches) {
  if (match === "do()") {
    allowMultiplication = true
  } else if (match === "don\'t()") {
    allowMultiplication = false
  } else if (match.startsWith("mul") && allowMultiplication === true) {
    const args = match
      .split("(")[1]
      .split(")")[0]
      .split(",")
      .map(Number)

    if (args.length === 2 && args.findIndex((v) => Number.isNaN(v)) === -1) {
      retVal = retVal + args.reduce((prev, curr) => prev * curr, 1)
    }
  }
}

console.log("Result: " + retVal.toString())
