import path from "node:path"
import { readFileSync } from "node:fs"

const cwd = process.cwd();
const data = readFileSync(path.join(cwd, "data.txt")).toString().trim()
const chars = data.split("")

console.log("Result: " + (chars.filter((v) => v === "(").length - chars.filter((v) => v === ")").length).toString())
