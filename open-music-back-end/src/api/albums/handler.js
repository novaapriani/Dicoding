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

      const response = h.response({
        status: 'success',
        message: 'Album berhasil ditambahkan',
        data: {
          albumId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });

        response.code(error.statusCode);
        return response;
      }

      console.error(error);
      const response = h.response({
        status: 'error',
        message: 'Maaf terjadi kegagalan di server kami',
      });

      response.code(500);
      return response;
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
        const response = h.response({
          status: 'fail',
          message: error.message,
        });

        response.code(error.statusCode);
        return response;
      }

      console.error(error);
      const response = h.response({
        status: 'error',
        message: 'Maaf terjadi kegagalan di server kami',
      });

      response.code(500);
      return response;
    }
  }

  async putAlbumByIdHandler(req, h) {
    this._validator.validateAlbumPayload(req.payload);
    const { albumId } = req.params;
    try {
      await this._service.editAlbumById(albumId, req.payload);

      const response = h.response({
        status: 'success',
        message: 'Album berhasil diperbarui',
      });
      response.code(200);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });

        response.code(error.statusCode);
        return response;
      }

      console.error(error);
      const response = h.response({
        status: 'error',
        message: 'Maaf terjadi kegagalan di server kami',
      });

      response.code(500);
      return response;
    }
  }

  async deleteAlbumByIdHandler(req, h) {
    const { albumId } = req.params;

    try {
      await this._service.deleteAlbumById(albumId);

      const response = h.response({
        status: 'success',
        message: 'Album berhasil dihapus',
      });
      response.code(200);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });

        response.code(error.statusCode);
        return response;
      }

      console.error(error);
      const response = h.response({
        status: 'error',
        message: 'Maaf terjadi kegagalan di server kami',
      });

      response.code(500);
      return response;
    }
  }
}

module.exports = AlbumsHandler;
