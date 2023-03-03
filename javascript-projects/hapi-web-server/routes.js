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
      const { lang } = req.query

      if (lang === "id") {
        return `Hai ${name}! dari ${lang}`
      }

      return `Hello ${name}`
    },
  },
  {
    method: "POST",
    path: "/login",
    handler: (req, h) => {
      // ambil data dari body
      const { username } = req.payload
      return `${username} telah berhasil login!`
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
