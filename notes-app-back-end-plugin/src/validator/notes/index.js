const { NotePayloadSchema } = require('./schema');

const NotesValidator = {
  // evaluasi validasi berhasil atau tidak
  validateNotePayload: (payload) => {
    const validationResult = NotePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = {
  NotesValidator,
};
