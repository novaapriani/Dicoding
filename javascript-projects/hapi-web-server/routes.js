const routes = [
  {
    method: "GET",
    path: "/",
    handler: (req, h) => {
      return "Homepage"
    },
  },
  {
    method: "*",
    path: "/",
    handler: (req, h) => {
      return "Halaman tidak dapat diakses dengan method tersebut"
    },
  },
  {
    method: "GET",
    path: "/about",
    handler: (req, h) => {
      return "About Page"
    },
  },
  {
    method: "*",
    path: "/about",
    handler: (req, h) => {
      return "Halaman tidak dapat diakses dengan method tersebut"
    },
  },
  {
    method: "GET",
    // dengan adanya (?) menjadikan parameter menjadi optional
    path: "/hello/{name?}",
    handler: (req, h) => {
      // path param ada di params
      const { name = "stranger" } = req.params
      return `Hello ${name}`
    },
  },
  {
    // prevent method yg belum di-define disetiap route
    method: "*",
    // menangani path yg belum ditentukan
    path: "/{any*}",
    handler: (req, h) => {
      return "Halaman tidak dapat ditemukan"
    },
  },
]

module.exports = routes
