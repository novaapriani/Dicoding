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
// agar tidak ada undefined ganti ke Sync
console.log(
  fs.readFile(path.resolve(__dirname, "notes.txt"), "utf-8", readFile),
)
