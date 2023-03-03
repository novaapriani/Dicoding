const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (req, h) => {
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
    //   .header(
    //     'Access-Control-Allow-Origin',
    //     'http://notesapp-v1.dicodingacademy.com',
    //   );
    //   data dikonsumsi di seluruh origin
    //   .header('Access-Control-Allow-Origin', '*');
    return response;
  }
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
};
