import amqp from "amqplib";

let channel;

export async function connectRabbit() {
  const connection = await amqp.connect(process.env.RABBITMQ_URI);

  channel = await connection.createChannel();

  console.log("RabbitMQ connected");
}

export async function publishToQueue(queueName, data) {
  await channel.assertQueue(queueName, {
    durable: true,
  });

  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
}
