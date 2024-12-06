import path from "node:path"
import { readFileSync } from "node:fs"

const cwd = process.cwd();
const data = readFileSync(path.join(cwd, "data.txt")).toString().trim()
const lines = data.split(/\r?\n/)

const { pageOrderingRules, pageNumbers } = lines.reduce((data, line) => {
  if (line.trim().length === 0) {
    data.encounteredEmpty = true
  } else {
    if (data.encounteredEmpty === true) {
      data.pageNumbers.push(line.split(",").map(Number))
    } else {
      data.pageOrderingRules.push(line.split("|").map(Number))
    }
  }

  return data
}, {
  pageOrderingRules: [],
  pageNumbers: [],
})

const orderRule = pageOrderingRules.reduce((prev, curr) => {
  if (curr[1] in prev) {
    prev[curr[1]].push(curr[0])
  } else {
    prev[curr[1]] = [curr[0]]
  }

  return prev
}, {})


const correctlyOrdered = pageNumbers.reduce((prev, curr) => {
  const previousNumbers = []
  const hasMissing = curr.findIndex((num) => {
    const requiredBefore = num in orderRule ? orderRule[num].filter((v) => curr.includes(v)) : []

    previousNumbers.push(num)

    return requiredBefore.findIndex((v) => !previousNumbers.includes(v)) !== -1
  }) !== -1

  if (hasMissing === false) {
    prev.push(curr)
  }

  return prev
}, [])

let resp = correctlyOrdered.reduce((prev, curr) => prev + curr[Math.floor(curr.length / 2)], 0)

console.log("Result: " + resp.toString())
