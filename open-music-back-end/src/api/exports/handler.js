const autoBind = require('auto-bind');
const ClientError = require('../../exceptions/ClientError');

class ExportsHandler {
  constructor(service, validator, playlistsService) {
    this._service = service;
    this._validator = validator;
    this._playlistsService = playlistsService;

    autoBind(this);
  }

  async postExportPlaylistByIdHandler(req, h) {
    try {
      this._validator.validateExportPlaylistByIdPayload(req.payload);
      const { id: playlistId } = req.params;
      const { id: credentialId } = req.auth.credentials;

      await this._playlistsService.verifyPlaylistOwner(
        playlistId,
        credentialId,
      );
      await this._playlistsService.verifyPlaylist(playlistId);

      const message = {
        userId: req.auth.credentials.id,
        playlistId,
        targetEmail: req.payload.targetEmail,
      };

      await this._service.sendMessage(
        'export:playlist',
        JSON.stringify(message),
      );

      const response = h.response({
        status: 'success',
        message: 'Permintaan Anda dalam antrean',
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

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = ExportsHandler;
