const autoBind = require('auto-bind');
const ClientError = require('../../exceptions/ClientError');

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postAlbumHandler(req, h) {
    try {
      // bisa access method karena udah di-register
      this._validator.validateAlbumPayload(req.payload);
      const { name, year } = req.payload;

      const albumId = await this._service.addAlbum({ name, year });

      return h
        .response({
          status: 'success',
          message: 'Album berhasil ditambahkan',
          data: {
            albumId,
          },
        })
        .code(201);
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: error.message,
          })
          .code(error.statusCode);
      }

      console.error(error);
      return h
        .response({
          status: 'error',
          message: 'Maaf terjadi kegagalan di server kami',
        })
        .code(500);
    }
  }

  async getAlbumByIdHandler(req, h) {
    try {
      const { albumId } = req.params;
      const album = await this._service.getAlbumById(albumId);
      const song = await this._service.getSongsAlbum(albumId);
      return {
        status: 'success',
        data: {
          album: { ...album, song },
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: error.message,
          })
          .code(error.statusCode);
      }

      console.error(error);
      return h
        .response({
          status: 'error',
          message: 'Maaf terjadi kegagalan di server kami',
        })
        .code(500);
    }
  }

  async putAlbumByIdHandler(req, h) {
    this._validator.validateAlbumPayload(req.payload);
    const { albumId } = req.params;
    try {
      await this._service.editAlbumById(albumId, req.payload);

      return h
        .response({
          status: 'success',
          message: 'Album berhasil diperbarui',
        })
        .code(200);
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: error.message,
          })
          .code(error.statusCode);
      }

      console.error(error);
      return h
        .response({
          status: 'error',
          message: 'Maaf terjadi kegagalan di server kami',
        })
        .code(500);
    }
  }

  async deleteAlbumByIdHandler(req, h) {
    const { albumId } = req.params;

    try {
      await this._service.deleteAlbumById(albumId);

      return h
        .response({
          status: 'success',
          message: 'Album berhasil dihapus',
        })
        .code(200);
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: error.message,
          })
          .code(error.statusCode);
      }

      console.error(error);
      return h
        .response({
          status: 'error',
          message: 'Maaf terjadi kegagalan di server kami',
        })
        .code(500);
    }
  }
}

module.exports = AlbumsHandler;
