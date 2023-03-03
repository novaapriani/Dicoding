const http = require("http")

const port = 5000
const host = "localhost"

const requestListener = (req, res) => {
  // method apa yg dipakai
  const { method } = req

  if (method === "GET") {
    res.setHeader("Content-Type", "text/html")

    res.statusCode = 200
    res.end("<h1>Halo HTTP server!</h1>")
  }

  if (method === "POST") {
    let body = []

    req.on("data", (chunk) => body.push(chunk))
    req.on("end", () => {
      // ubah buffer menjadi actual data
      body = Buffer.concat(body).toString()
      //   parse data yg dikirim
      const { name } = JSON.parse(body)
      res.end(`Hai ${name}`)
    })
  }
}

const server = http.createServer(requestListener)

// listen(port, host, backlog, listeningListener)
server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`)
})
