const autoBind = require('auto-bind');
const config = require('../../utils/config');

class UploadsHandler {
  constructor(service, albumsService, validator) {
    this._service = service;
    this._albumsService = albumsService;
    this._validator = validator;

    autoBind(this);
  }

  async postAlbumCoverHandler(req, h) {
    const { cover } = req.payload;
    const { id } = req.params;

    this._validator.validateImageHeaders(cover.hapi.headers);

    const filename = await this._service.writeFile(cover, cover.hapi);
    const fileLocation = `http://${config.app.host}:5000/upload/images/${filename}`;

    await this._albumsService.addCoverAlbum(id, fileLocation);

    return h
      .response({
        status: 'success',
        message: 'Cover berhasil ditambah',
      })
      .code(201);
  }
}

module.exports = UploadsHandler;
