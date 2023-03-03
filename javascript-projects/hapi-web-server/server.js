const Hapi = require("@hapi/hapi")
const routes = require("./routes")

const init = async () => {
  // Hapi.server => HTTP server
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
  })

  server.route(routes)

  await server.start()
  //   alamat lengkap server di-running
  console.log(`Server running on ${server.info.uri}`)
}

init()
