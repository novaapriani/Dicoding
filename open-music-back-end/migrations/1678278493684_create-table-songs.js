/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'varchar(50)',
      primaryKey: true,
    },
    title: {
      type: 'varchar(1000)',
      notNull: true,
    },
    year: {
      type: 'integer',
      notNull: true,
    },
    genre: {
      type: 'varchar(50)',
      notNull: true,
    },
    performer: {
      type: 'varchar(50)',
      notNull: true,
    },
    duration: {
      type: 'integer',
      notNull: false,
    },
    albumId: {
      type: 'varchar(50)',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('songs');
};
