import path from "node:path"
import { readFileSync } from "node:fs"

const cwd = process.cwd();
const lines = readFileSync(path.join(cwd, "data.txt")).toString().trim().split(/\r?\n/g)

let retVal = 0
let directions = ["increasing", "decreasing"]

for (let lI = 0; lI < lines.length; lI++) {
  const numbers = lines[lI].split(/\s/g).map((v) => parseInt(v))
  let isSafe = false

  // check both incrasing and decreasing directions
  for (let dI = 0; dI < directions.length; dI++) {
    let hasSkipped = false
    let lastNumber = null
    let cachedIsSafe = true
    const direction = directions[dI]

    // we can set initial number index to 1, as idx 0 is the initial lastNumber value
    for (let nI = 0; nI < numbers.length; nI++) {
      const dist = Math.abs(lastNumber - numbers[nI])

      if (
        lastNumber !== null &&
        (
          dist > 3 || dist < 1 ||
          (direction === "increasing" && lastNumber > numbers[nI]) ||
          (direction === "decreasing" && lastNumber < numbers[nI])
        )
      ) {
        // number is bad

        if (hasSkipped === true) {
          // if bad number has already been skipped once, then the sequence is bad
          cachedIsSafe = false
          break
        } else {
          hasSkipped = true
        }
      } else {
        // only update last number if number was "good"
        lastNumber = numbers[nI]
      }
    }

    if (cachedIsSafe === true) {
      isSafe = true
      // if cached is safe is true for either direction, no more checking is needed
      break
    }
  }

  if (isSafe == true) {
    retVal = retVal + 1
  }
}

console.log("Result: " + retVal.toString())
