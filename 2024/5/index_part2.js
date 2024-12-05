import path from "node:path"
import { readFileSync } from "node:fs"

const cwd = process.cwd();
const data = readFileSync(path.join(cwd, "data.txt")).toString().trim()
const lines = data.split(/\r?\n/)

let hasEncounteredEmpty = false
const pageOrderingRules = []
const pageNumbers = []
for (const line of lines) {
  if (line.trim().length === 0) {
    hasEncounteredEmpty = true
  } else {
    if (hasEncounteredEmpty) {
      pageNumbers.push(line.split(",").map(Number))
    } else {
      pageOrderingRules.push(line.split("|").map(Number))
    }
  }
}

const correctlyOrdered = []
const orderRule = {}
for (const pageOrder of pageOrderingRules) {
  if (!(pageOrder[1] in orderRule)) {
    orderRule[pageOrder[1]] = []
  }

  orderRule[pageOrder[1]].push(pageOrder[0])
}

for (const pageOrderList of pageNumbers) {
  const previousNumbers = []
  const missingNumbers = []

  for (const num of pageOrderList) {
    const requiredBefore = num in orderRule ? orderRule[num].filter((v) => pageOrderList.includes(v)) : []

    for (const previous of requiredBefore) {
      if (!previousNumbers.includes(previous)) {
        missingNumbers.push(num)
        break;
      }
    }


    previousNumbers.push(num)
  }

  if (missingNumbers.length !== 0) {
    for (const missing of missingNumbers) {
      const idx = pageOrderList.findIndex((v) => v === missing)

      if (idx !== -1) {
        const requiredBefore = missing in orderRule ? orderRule[missing].filter((v) => pageOrderList.includes(v)) : []
        let requiredIdx = -1

        for (const required of requiredBefore) {
          const currentIdx = pageOrderList.findIndex((v) => v === required)

          if (currentIdx > requiredIdx) {
            requiredIdx = currentIdx
          }
        }

        if (requiredIdx !== -1) {
          pageOrderList.splice(idx, 1)
          pageOrderList.splice(requiredIdx, 0, missing)
        }
      }
    }

    correctlyOrdered.push(pageOrderList)
  }
}

let resp = 0
for (const pageNumberList of correctlyOrdered) {
  const numIdx = Math.floor(pageNumberList.length / 2)
  resp = resp + pageNumberList[numIdx]
}

console.log("Result: " + resp.toString())
