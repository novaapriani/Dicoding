const fs = require("fs")
const path = require("path")

const readableStream = fs.createReadStream(
  path.resolve(__dirname, "input.txt"),
  {
    highWaterMark: 15,
  },
)

const writeableStream = fs.createWriteStream(
  path.resolve(__dirname, "output.txt"),
)

readableStream.on("readable", () => {
  try {
    // tulis apa yg dibaca readableStream
    writeableStream.write(`[${readableStream.read()}\n]`)
  } catch (error) {
    // catch the error when the chunk cannot be read.
  }
})

readableStream.on("end", () => {
  console.log("Selesai")
})
