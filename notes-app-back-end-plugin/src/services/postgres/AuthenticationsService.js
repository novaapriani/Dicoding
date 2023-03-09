const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class AuthenticationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addRefreshToken(token) {
    await this._pool.query(`insert into authentications values('${token}')`);
  }

  async verifyRefreshToken(token) {
    const query = {
      text: 'select token from authentications where token = $1',
      values: [token],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Refresh token tidak valid');
    }
  }

  async deleteRefreshToken(token) {
    await this._pool.query(
      `delete from authentications where token = '${token}'`,
    );
  }
}

module.exports = AuthenticationsService;
