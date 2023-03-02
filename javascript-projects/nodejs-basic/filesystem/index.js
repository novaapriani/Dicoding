const fs = require("fs")
const path = require("path")

const readFile = (error, data) => {
  if (error) {
    console.log(`Data gagal dikirim! ${error}`)
    return
  }

  console.log(data)
}

// console.log(fs.readFile("notes.txt", "utf-8", readFile))

// file harus cjs jgn module
console.log(
  fs.readFileSync(path.resolve(__dirname, "notes.txt"), "utf-8", readFile),
)
