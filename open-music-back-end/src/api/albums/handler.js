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
      const { id } = req.params;
      const album = await this._service.getAlbumById(id);
      const song = await this._service.getSongsAlbum(id);

      return h
        .response({
          status: 'success',
          data: {
            album: { ...album, song },
          },
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

  async putAlbumByIdHandler(req, h) {
    try {
      this._validator.validateAlbumPayload(req.payload);
      const { id } = req.params;
      await this._service.editAlbumById(id, req.payload);

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
    const { id } = req.params;

    try {
      await this._service.deleteAlbumById(id);

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
