const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');

class AlbumsLikesService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addAlbumLike(userId, albumId) {
    const id = `like-${nanoid(16)}`;
    const query = {
      text: 'insert into albumLikes values ($1, $2, $3) returning id',
      values: [id, userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Gagal melakukan Like');
    }

    await this._cacheService.delete(`album_likes:${albumId}`);
    return result.rows[0].id;
  }

  async deleteAlbumLike(userId, albumId) {
    const query = {
      text: `delete from albumLikes 
      where user_id = $1 AND "album_id" = $2 returning id`,
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Gagal melakukan unlike');
    }

    await this._cacheService.delete(`album_likes:${albumId}`);
  }

  async checkLike(userId, albumId) {
    const query = {
      text: `select * from albumLikes 
      where user_id = $1 AND "album_id" = $2`,
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    return result.rowCount;
  }

  async getLikesCount(albumId) {
    try {
      const result = await this._cacheService.get(`album_likes:${albumId}`);
      return {
        count: JSON.parse(result),
        source: 'cache',
      };
    } catch (error) {
      const query = {
        text: `select * from albumLikes 
        where "album_id" = $1`,
        values: [`${albumId}`],
      };

      const result = await this._pool.query(query);
      if (!result.rowCount) {
        throw new InvariantError('Album tidak memiliki like');
      }

      await this._cacheService.set(
        `album_likes:${albumId}`,
        JSON.stringify(result.rowCount),
      );

      return {
        count: result.rowCount,
        source: 'db',
      };
    }
  }
}
module.exports = AlbumsLikesService;
