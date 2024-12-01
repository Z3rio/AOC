import path from "node:path"
import { readFileSync } from "node:fs"

const cwd = process.cwd();
const input = readFileSync(path.join(cwd, "data.txt"))
const lines = input.toString().split(/\r?\n/)

let leftList = []
let rightList = []
let retVal = 0

for (let i = 0; i < lines.length; i++) {
  const splits = lines[i].split("   ")
  if (splits.length === 2) {
    leftList.push(parseInt(splits[0]))
    rightList.push(parseInt(splits[1]))
  }
}

const numSort = (a, b) => {
  if (a < b) {
    return -1
  } else if (a > b) {
    return 1
  }

  return 0
}

leftList = leftList.sort(numSort)
rightList = rightList.sort(numSort)

for (let i = 0; i < leftList.length; i++) {
  retVal = retVal + Math.abs(leftList[i] - rightList[i])
}

console.log("Result: " + retVal.toString())
