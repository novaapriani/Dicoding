/* eslint-disable import/no-extraneous-dependencies */
const Jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/InvariantError');

const TokenManager = {
  // payload: objects artifact JWT
  // payload berisi properti yang mengindikasikan identitas pengguna, contohnya user id.
  generateAccessToken: (payload) =>
    Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
  generateRefreshToken: (payload) =>
    Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY),
  verifyRefreshToken: (refreshToken) => {
    try {
      // verifyToken hanya bisa menerima token yg sudah di-decode
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);
      const { payload } = artifacts.decoded;
      // payload untuk membuat token baru
      return payload;
    } catch (error) {
      throw new InvariantError('Refresh Token tidak valid');
    }
  },
};

module.exports = TokenManager;
