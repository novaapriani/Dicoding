const config = {
  app: {
    host: process.env.HOST,
  },
  rabbitMq: {
    server: process.env.RABBITMQ_SERVER,
  },
  redis: {
    host: process.env.REDIS_SERVER,
  },
  token: {
    access: process.env.ACCESS_TOKEN_KEY,
    age: process.env.ACCESS_TOKEN_AGE,
    refresh: process.env.REFRESH_TOKEN_KEY,
  },
};

module.exports = config;
