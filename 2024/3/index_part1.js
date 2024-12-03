import path from "node:path"
import { readFileSync } from "node:fs"

const cwd = process.cwd();
const data = readFileSync(path.join(cwd, "data.txt")).toString().trim()
const splits = data
  .split("mul(")
  .map((v) => v.split(")")[0])
const nums = splits
  .map((v) => v.split(","))
  .filter((v) => v.length === 2)
  .map((v) => v.map(Number))
  .filter((v) => v.findIndex((v2) => Number.isNaN(v2)) === -1)
const result = nums
  .reduce((prev, curr) => prev +
    curr.reduce((prev2, curr2) => prev2 * curr2, 1), 0)

console.log("Result: " + result)
