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

const editNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const { title, tags, body } = req.payload;
  const updatedAt = new Date().toISOString;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'catatan berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan!',
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const note = notes.findIndex((n) => n.id === id);

  if (note !== -1) {
    notes.splice(note, 1);

    const response = h.response({
      status: 'success',
      message: 'Data berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Data gagal dihapus. Id tidak ditemukan!',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
