const routes = (handler) => [
  {
    method: 'POST',
    path: '/export/playlists/{id}',
    handler: handler.postExportPlaylistByIdHandler,
    options: {
      auth: 'musicsapp_jwt',
    },
  },
];

module.exports = routes;
