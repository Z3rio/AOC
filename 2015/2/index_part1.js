import path from "node:path"
import { readFileSync } from "node:fs"

const cwd = process.cwd();
const lines = readFileSync(path.join(cwd, "data.txt")).toString().trim().split(/\r?\n/)
let retVal = 0

for (let i = 0; i < lines.length; i++) {
  const splits = lines[i].split("x").map(Number)
  const l = splits[0]
  const w = splits[1]
  const h = splits[2]

  retVal = retVal + (l * w * 2) + (w * h * 2) + (h * l * 2) + Math.min((l * w), (w * h), (h * l))
}

console.log("Result: " + retVal.toString())
