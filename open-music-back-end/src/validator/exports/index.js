const InvariantError = require('../../exceptions/InvariantError');
const ExportPlaylistByIdPayloadSchema = require('./schema');

const ExportsValidator = {
  validateExportPlaylistByIdPayload: (payload) => {
    const validationResult = ExportPlaylistByIdPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ExportsValidator;
