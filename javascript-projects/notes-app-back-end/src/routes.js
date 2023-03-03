const { addNoteHandlers } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandlers,
  },
];

module.exports = routes;
