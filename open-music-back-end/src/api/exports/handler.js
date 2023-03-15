const autoBind = require('auto-bind');

class ExportsHandler {
  constructor(service, validator, playlistsService) {
    this._service = service;
    this._validator = validator;
    this._playlistsService = playlistsService;

    autoBind(this);
  }

  async postExportPlaylistByIdHandler(req, h) {
    this._validator.validateExportPlaylistByIdPayload(req.payload);
    const { id: playlistId } = req.params;
    const { id: credentialId } = req.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this._playlistsService.verifyPlaylist(playlistId);

    const message = {
      userId: req.auth.credentials.id,
      playlistId,
      targetEmail: req.payload.targetEmail,
    };

    await this._service.sendMessage('export:playlist', JSON.stringify(message));

    return h
      .response({
        status: 'success',
        message: 'Permintaan Anda dalam antrean',
      })
      .code(201);
  }
}

module.exports = ExportsHandler;
