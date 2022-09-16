import Kafka from 'node-rdkafka';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const BROKER_SERVER_URL = process.env.BROKER_SERVER_URL
export const TOPIC = process.env.TOPIC

function createConfigMap() {
    return {
        'bootstrap.servers': BROKER_SERVER_URL,
        'group.id': 'kafka-nodejs-getting-started'
    }
}

export default function createConsumer(onData) {
  const consumer = new Kafka.KafkaConsumer(
      createConfigMap(),
      {'auto.offset.reset': 'earliest'});

  return new Promise((resolve, _reject) => {
    consumer
     .on('ready', () => resolve(consumer))
     .on('data', onData);

    consumer.connect();
  });
};
