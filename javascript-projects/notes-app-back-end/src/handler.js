const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandlers = (req, h) => {
  const id = nanoid(16);
  const { title, tags, body } = req.payload;
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  notes.push({ id, title, tags, body, createdAt, updatedAt });

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });

    response.code(201);
    return response;
  }
};

module.exports = {
  addNoteHandlers,
};
