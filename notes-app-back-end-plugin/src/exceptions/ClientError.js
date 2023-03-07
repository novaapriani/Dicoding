class ClientError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this._name = 'ClientError';
    this._statusCode = statusCode;
  }
}

module.exports = {
  ClientError,
};
