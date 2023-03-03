const Hapi = require("@hapi/hapi")

const init = async () => {
  // Hapi.server => HTTP server
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
  })

  await server.start()
  //   alamat lengkap server di-running
  console.log(`Server running on ${server.info.uri}`)
}

init()
