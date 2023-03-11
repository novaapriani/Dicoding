const autoBind = require('auto-bind');

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postAlbumHandler(req, h) {
    // bisa access method karena udah di-register
    this._validator.validateAlbumPayload(req.payload);

    const albumId = await this._service.addAlbum(req.payload);

    return h
      .response({
        status: 'success',
        message: 'Album berhasil ditambahkan',
        data: {
          albumId,
        },
      })
      .code(201);
  }

  async getAlbumByIdHandler(req) {
    const { id } = req.params;
    const album = await this._service.getAlbumById(id);
    const song = await this._service.getSongsAlbum(id);

    return {
      status: 'success',
      data: {
        album: { ...album, song },
      },
    };
  }

  async putAlbumByIdHandler(req) {
    this._validator.validateAlbumPayload(req.payload);
    const { id } = req.params;
    await this._service.editAlbumById(id, req.payload);

    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
  }

  async deleteAlbumByIdHandler(req) {
    const { id } = req.params;
    await this._service.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Album berhasil dihapus',
    };
  }
}

module.exports = AlbumsHandler;
