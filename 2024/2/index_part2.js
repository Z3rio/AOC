import path from "node:path"
import { readFileSync } from "node:fs"

const cwd = process.cwd();
const lines = readFileSync(path.join(cwd, "data.txt")).toString().trim().split(/\r?\n/g)

let retVal = 0
let directions = ["increasing", "decreasing"]

function isReportSafe(numbers) {
  // check both incrasing and decreasing directions
  for (const direction of directions) {
    let lastNumber = numbers[0]
    let valid = true

    // we can set initial number index to 1, as idx 0 is the initial lastNumber value
    for (let nI = 1; nI < numbers.length; nI++) {
      const dist = Math.abs(lastNumber - numbers[nI])

      if (
        dist > 3 || dist < 1 ||
        (direction === "increasing" && lastNumber > numbers[nI]) ||
        (direction === "decreasing" && lastNumber < numbers[nI])
      ) {
        valid = false
        // dont continue checking numbers if invalid
        break
      }

      lastNumber = numbers[nI]
    }

    // only one direction has to be valid
    if (valid === true) {
      return true
    }
  }

  return false
}

for (let lI = 0; lI < lines.length; lI++) {
  const numbers = lines[lI].split(/\s/g).map(Number)

  // initial idx is set to -1 to account for testing with no numbers removed
  for (let i = -1; i < numbers.length; i++) {
    const modifiedNumbers = [...numbers.slice(0, i), ...numbers.slice(i + 1)];
    if (isReportSafe(modifiedNumbers)) {
      retVal = retVal + 1
      break;
    }
  }
}

console.log("Result: " + retVal.toString())
