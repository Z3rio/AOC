import path from "node:path"
import { readFileSync } from "node:fs"

const cwd = process.cwd();
const lines = readFileSync(path.join(cwd, "data.txt")).toString().trim().split(/\r?\n/)

let leftList = []
let rightList = []
let retVal = 0

for (let i = 0; i < lines.length; i++) {
  const splits = lines[i].split("   ")
  leftList.push(parseInt(splits[0]))
  rightList.push(parseInt(splits[1]))
}

leftList = leftList.sort()
rightList = rightList.sort()

for (let i = 0; i < leftList.length; i++) {
  retVal = retVal + Math.abs(leftList[i] - rightList[i])
}

console.log("Result: " + retVal.toString())
