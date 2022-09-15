import Kafka from 'node-rdkafka';

const BROKER_SERVER_URL = "localhost:9092"
export const TOPIC = 'votes'

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
