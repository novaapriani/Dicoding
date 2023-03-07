// schema / aturan data untuk notes request payload
const Joi = require('joi');

const NotePayloadSchema = Joi.Object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
});

module.exports = { NotePayloadSchema };
