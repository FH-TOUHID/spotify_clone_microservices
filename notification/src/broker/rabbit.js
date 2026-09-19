import amqp from "amqplib";

let channel;

export async function connectRabbit() {
  const connection = await amqp.connect(process.env.RABBITMQ_URI);

  channel = await connection.createChannel();

  console.log("RabbitMQ connected");
}

export async function subscribeToQueue(queueName, callback) {
  await channel.assertQueue(queueName, {
    durable: true,
  });

  channel.consume(
    queueName,

    async (message) => {
      if (message) {
        const data = JSON.parse(message.content.toString());

        await callback(data);

        channel.ack(message);
      }
    },
  );
}
