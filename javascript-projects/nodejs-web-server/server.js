const http = require("http")

const port = 5000
const host = "localhost"

const requestListener = (req, res) => {
  // method apa yg dipakai
  const { method, url } = req

  if (url === "/") {
    if (method === "GET") {
      res.setHeader("Content-Type", "application/json")
      // header dengan properti tidak standar
      // tambahkan X-Proper-Case
      res.setHeader("X-Powered-By", "NodeJS")

      res.statusCode = 200
      res.end(
        JSON.stringify({
          message: "Ini adalah homepage",
        }),
      )
    } else {
      res.setHeader("Content-Type", "application/json")
      res.statusCode = 400
      res.end(
        JSON.stringify({
          message: `Halaman tidak dapat diakses dengan ${method} request!`,
        }),
      )
    }
  } else if (url === "/about") {
    if (method === "GET") {
      res.setHeader("Content-Type", "application/json")

      res.statusCode = 200
      res.end(
        JSON.stringify({
          message: "Ini adalah halaman about",
        }),
      )
    } else if (method === "POST") {
      res.setHeader("Content-Type", "application/json")
      let body = []

      req.on("data", (chunk) => body.push(chunk))
      req.on("end", () => {
        // ubah buffer menjadi actual data
        body = Buffer.concat(body).toString()
        //   parse data yg dikirim
        const { name } = JSON.parse(body)
        res.end(
          JSON.stringify({
            message: `Halo ${name}! Ini adalah halaman about.`,
          }),
        )
      })
    } else {
      res.setHeader("Content-Type", "application/json")
      res.statusCode = 400
      res.end(
        JSON.stringify({
          message: `Halaman tidak dapat diakses dengan ${method} request!`,
        }),
      )
    }
  } else {
    res.setHeader("Content-Type", "application/json")
    res.statusCode = 404
    res.end(
      JSON.stringify({
        message: "Halaman tidak dapat ditemukan!",
      }),
    )
  }
}

const server = http.createServer(requestListener)

// listen(port, host, backlog, listeningListener)
server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`)
})
