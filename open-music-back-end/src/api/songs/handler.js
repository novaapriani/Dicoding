const autoBind = require('auto-bind');
const ClientError = require('../../exceptions/ClientError');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postSongHandler(req, h) {
    try {
      this._validator.validateSongPayload(req.payload);
      const { title, year, performer, genre, duration, albumId } = req.payload;
      const songId = await this._service.addSong({
        title,
        year,
        genre,
        performer,
        duration,
        albumId,
      });

      return h
        .response({
          status: 'success',
          message: 'Lagu berhasil ditambahkan',
          data: {
            songId,
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

  async getSongsHandler(req, h) {
    try {
      const { title, performer } = req.query;
      const songs = await this._service.getSongs(title, performer);
      return h
        .response({
          status: 'success',
          data: {
            songs,
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

  async getSongByIdHandler(req, h) {
    try {
      const { songId } = req.params;
      const song = await this._service.getSongById(songId);

      return h
        .response({
          status: 'success',
          data: {
            song,
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

  async putSongByIdHandler(req, h) {
    try {
      this._validator.validateSongPayload(req.payload);
      const { songId } = req.params;

      await this._service.editSongById(songId, req.payload);

      return h
        .response({
          status: 'success',
          message: 'Lagu berhasil diperbarui',
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

  async deleteSongByIdHandler(req, h) {
    try {
      const { songId } = req.params;
      await this._service.deleteSongById(songId);

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil dihapus',
      });
      response.code(201);
      return response;
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

module.exports = SongsHandler;
