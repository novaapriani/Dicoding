require('dotenv').config();
const Hapi = require('@hapi/hapi');
const ClientError = require('./exceptions/ClientError');
const albums = require('./api/albums');
const AlbumsService = require('./services/postgres/AlbumsService');
const { AlbumsValidator } = require('./validator/albums');

const init = async () => {
  const albumsService = new AlbumsService();

  const server = Hapi.server({
    port: 5000,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // server.ext('onPreResponse', (request, h) => {
  //   // mendapatkan konteks response dari request
  //   const { response } = request;
  //   if (response instanceof Error) {
  //     // penanganan client error secara internal.
  //     if (response instanceof ClientError) {
  //       const newResponse = h.response({
  //         status: 'error',
  //         message: response.message,
  //       });
  //       newResponse.code(response.statusCode);
  //       return newResponse;
  //     }
  //     // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
  //     if (!response.isServer) {
  //       return h.continue;
  //     }
  //     // penanganan server error sesuai kebutuhan
  //     const newResponse = h.response({
  //       status: 'error',
  //       message: 'terjadi kegagalan pada server kami',
  //     });
  //     newResponse.code(500);
  //     return newResponse;
  //   }
  //   // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
  //   return h.continue;
  // });

  await server.register({
    plugin: albums,
    options: {
      service: albumsService,
      validator: AlbumsValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
