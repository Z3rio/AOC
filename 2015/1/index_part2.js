import path from "node:path"
import { readFileSync } from "node:fs"

const cwd = process.cwd();
const data = readFileSync(path.join(cwd, "data.txt")).toString().trim()
const chars = data.split("")
let counter = 0

for (let i = 0; i < chars.length; i++) {
  if (chars[i] === "(") {
    counter = counter + 1
  } else {
    counter = counter - 1
  }

  if (counter === -1) {
    console.log("Result: " + (i + 1).toString())
    process.exit(1)
  }
}
