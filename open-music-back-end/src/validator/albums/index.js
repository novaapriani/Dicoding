const InvariantError = require('../../../../notes-app-back-end-plugin/src/exceptions/InvariantError');
const { AlbumPayloadSchema } = require('./schema');

const AlbumsValidator = {
  validateAlbumPayload: (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error);
    }
  },
};

module.exports = { AlbumsValidator };
