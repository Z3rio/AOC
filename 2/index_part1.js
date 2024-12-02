import path from "node:path"
import { readFileSync } from "node:fs"

const cwd = process.cwd();
const lines = readFileSync(path.join(cwd, "data.txt")).toString().trim().split(/\r?\n/)

let retVal = 0

for (let i = 0; i < lines.length; i++) {
  const numbers = lines[i].split(/\s/g).map((v) => parseInt(v))
  let isSafe = true
  let lastNumber = null
  let direction = null

  for (let i2 = 0; i2 < numbers.length; i2++) {
    if (lastNumber !== null) {
      const dist = Math.abs(lastNumber - numbers[i2])

      if (
        dist > 3 || dist === 0 ||
        (direction === "increasing" && lastNumber > numbers[i2]) ||
        (direction === "decreasing" && lastNumber < numbers[i2])
      ) {
        isSafe = false
        break;
      }

      if (direction === null) {
        if (numbers[i2] > lastNumber) {
          direction = "increasing"
        } else {
          direction = "decreasing"
        }
      }
    }

    lastNumber = numbers[i2]
  }

  if (isSafe == true) {
    retVal = retVal + 1
  }
}

console.log("Result: " + retVal.toString())
