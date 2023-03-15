const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBAlbum } = require('../../utils/mapDBAlbum');

class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;

    const query = {
      text: 'insert into albums values($1, $2, $3) returning id',
      values: [id, name, year],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Album gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getAlbumById(id) {
    const query = {
      text: 'select * from albums where id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    return result.rows.map(mapDBAlbum)[0];
  }

  async getSongsAlbum(id) {
    const query = {
      text: 'select id, title, performer from songs where "album_id" = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async editAlbumById(id, { name, year }) {
    const query = {
      text: 'update albums set name = $1, year = $2 where id = $3 returning id',
      values: [name, year, id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Album gagal diperbarui. Id tidak ditemukan');
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'delete from albums where id = $1 returning id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }
  }

  async addCoverAlbum(id, coverUrl) {
    const query = {
      text: `update albums set "coverurl" = $2 
      where id = $1 returning id`,
      values: [id, coverUrl],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Gagal menambah cover. Id tidak ditemukan');
    }
  }
}

module.exports = AlbumsService;
