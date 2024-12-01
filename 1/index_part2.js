import path from "node:path"
import { readFileSync } from "node:fs"

const cwd = process.cwd();
const lines = readFileSync(path.join(cwd, "data.txt")).toString().trim().split(/\r?\n/)

let leftList = []
let rightList = []
let retVal = 0
const cache = {}

for (let i = 0; i < lines.length; i++) {
  const splits = lines[i].split("   ")
  leftList.push(parseInt(splits[0]))
  rightList.push(parseInt(splits[1]))
}

for (let i = 0; i < leftList.length; i++) {
  let amount = cache[leftList[i]]

  if (amount === undefined) {
    amount = rightList.filter((v) => v === leftList[i]).length
    cache[leftList[i]] = amount
  }

  retVal = retVal + leftList[i] * amount
}

console.log("Result: " + retVal.toString())
