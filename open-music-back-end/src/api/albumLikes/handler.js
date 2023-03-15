const autoBind = require('auto-bind');

class AlbumLikesHandler {
  constructor(service, albumsService) {
    this._service = service;
    this._albumsService = albumsService;

    autoBind(this);
  }

  async postLikeHandler(request, h) {
    const { id } = request.params;
    const albumId = id;
    const { id: credentialId } = request.auth.credentials;

    await this._albumsService.getAlbumById(albumId);

    const liked = await this._service.checkLike(credentialId, albumId);

    if (!liked) {
      const likeId = await this._service.addAlbumLike(credentialId, albumId);

      return h
        .response({
          status: 'success',
          message: `Berhasil melakukan like pada album dengan id: ${likeId}`,
        })
        .code(201);
    }

    await this._service.deleteAlbumLike(credentialId, albumId);

    return h
      .response({
        status: 'success',
        message: 'Berhasil melakukan unlike',
      })
      .code(201);
  }

  async getLikeHandler(request, h) {
    const { id } = request.params;
    const albumId = id;

    const data = await this._service.getLikesCount(albumId);
    const likes = data.count;

    return h
      .response({
        status: 'success',
        data: {
          likes,
        },
      })
      .header('X-Data-Source', data.source)
      .code(200);
  }
}

module.exports = AlbumLikesHandler;
