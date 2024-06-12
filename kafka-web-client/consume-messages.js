const { Kafka, Server } = require('kafkajs');
const express = require('express');

const kafka = new Kafka({
  clientId: 'my-kafka-consumer',
  brokers: ['localhost:9092'], // Replace with your Kafka broker address(es)
});

const consumer = kafka.consumer({ groupId: 'my-group' });
const messages = []; // Buffer to store messages

async function consumeMessages() {
  await consumer.connect();
  await consumer.subscribe({ topics: ['my-topic'] }); // Replace with your topic(s)

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value.toString(); // Parse message value
      messages.push({ value, timestamp: new Date().toISOString() }); // Add timestamp
    },
  });
}

consumeMessages();

const prog = express();

prog.get('/messages', (req, res) => {
  // Send the latest messages from the buffer
  res.json(messages.slice(-5)); // Send only the most recent five messages
});

const consumer_cl = Server(prog);

consumer_cl.listen(3000, () => console.log('The Server module is listening on port 3000'));
