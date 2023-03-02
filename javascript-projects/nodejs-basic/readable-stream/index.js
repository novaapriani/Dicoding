const fs = require("fs")

// return eventEmitter
const readableStream = fs.createReadStream("./article.txt", {
  // konfigurasi ukuran buffer
  // berkas dibaca setiap 10 karakter
  // 1 karakter = 1 bytes
  highWaterMark: 10,
})

// aktifkan eventEmitter
readableStream.on("readable", () => {
  try {
    process.stdout.write(`[${readableStream.read()}]`)
  } catch (error) {
    // catch the error when the chunk cannot be read.
  }
})

// dieksekusi setelah semuanya selesai(end)
readableStream.on("end", () => {
  console.log("Done")
})
