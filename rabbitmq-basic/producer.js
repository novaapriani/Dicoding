const amqp = require('amqplib');

const init = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queue = 'dicoding';
  const message = 'Selamat belajar Message Broker!';

  /* 
    .assertQueue(q name, options)
    idempoten : membuat channel baru jika tidak ada
    menjaga agar queue tetap tersedia ketika message broker restart
  */
  // cek queue sudah dibuat belum
  await channel.assertQueue(queue, {
    durable: true,
  });

  await channel.sendToQueue(queue, Buffer.from(message));
  console.log('Pesan berhasil terkirim!');

  setTimeout(() => {
    connection.close();
  }, 1000);
};

init();
