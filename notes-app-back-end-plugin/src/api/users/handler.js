const ClientError = require('../../exceptions/ClientError');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(req, h) {
    try {
      await this._validator.validateUserPayload(req.payload);
      const { username, password, fullname } = req.payload;

      const userId = await this._service.addUser({
        username,
        password,
        fullname,
      });

      return h
        .response({
          status: 'success',
          message: 'User berhasil ditambahkan',
          data: {
            userId,
          },
        })
        .code(201);
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: error.message,
          })
          .code(error.statusCode);
      }

      console.error(error);
      return h
        .response({
          status: 'error',
          message: 'Maaf terjadi kesalahan di server kami',
        })
        .code(500);
    }
  }

  async getUserByIdHandler(req, h) {
    try {
      const { id } = req.params;

      const user = await this._service.getUserById(id);

      return h
        .response({
          status: 'success',
          data: {
            user,
          },
        })
        .code(200);
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: error.message,
          })
          .code(error.statusCode);
      }

      console.error(error);
      return h
        .response({
          status: 'error',
          message: 'Maaf terjadi kesalahan di server kami',
        })
        .code(500);
    }
  }
}

module.exports = UsersHandler;
