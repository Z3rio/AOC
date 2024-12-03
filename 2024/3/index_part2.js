import path from "node:path"
import { readFileSync } from "node:fs"

const cwd = process.cwd();
let data = readFileSync(path.join(cwd, "data.txt")).toString().trim()
let foundIdx = null
let retVal = 0
let allowMultiplication = true
const keywords = {
  "don\'t": (raw) => {
    if (raw === "don't()") {
      allowMultiplication = false
    }
  },
  "do": (raw) => {
    if (raw === "do()") {
      allowMultiplication = true
    }
  },
  "mul": (raw) => {
    if (allowMultiplication === true && raw.startsWith("mul(") && raw.endsWith(")")) {
      const args = raw
        .split("(")[1]
        .split(")")[0]
        .split(",")
        .map(Number)

      if (args.length === 2 && args.findIndex((v) => Number.isNaN(v)) === -1) {
        retVal = retVal + args.reduce((prev, curr) => prev * curr, 1)
      }
    }
  }
}

while (foundIdx === null || foundIdx !== -1) {
  let cachedIdx = -1
  let foundKeyword = null

  for (const keyword in keywords) {
    const idx = data.indexOf(keyword)

    if (idx !== -1 && (cachedIdx === -1 || idx < cachedIdx)) {
      cachedIdx = idx
      foundKeyword = keyword
    }
  }

  if (foundKeyword !== null) {
    const splice = data.slice(cachedIdx, cachedIdx + foundKeyword.length + 1)
    let full = splice

    if (splice === foundKeyword + "(") {
      const end = data.slice(cachedIdx + foundKeyword.length + 1).split(")")[0]
      full = full + end + ")"

      keywords[foundKeyword](full)

      foundIdx = cachedIdx
    }

    data = data.slice(cachedIdx + full.length)

    continue;
  }

  break;
}

console.log("Result: " + retVal.toString())
