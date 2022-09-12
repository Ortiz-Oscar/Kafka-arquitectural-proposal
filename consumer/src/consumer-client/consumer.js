import { KafkaConsumer } from 'node-rdkafka';
const BROKER_SERVER_URL = 'localhost:9092';
const TOPIC = 'votes'

function createConfigMap() {
    return {
        'bootstrap.servers': BROKER_SERVER_URL,
        'group.id': 'kafka-nodejs-getting-started'
    }
}

function createConsumer(onData) {
  const consumer = new KafkaConsumer(
      createConfigMap(),
      {'auto.offset.reset': 'earliest'});

  return new Promise((resolve, reject) => {
    consumer
     .on('ready', () => resolve(consumer))
     .on('data', onData);

    consumer.connect();
  });
};


async function consumerExample() {
  const consumer = await createConsumer(({key, value}) => {
    let k = key.toString().padEnd(10, ' ');
    console.log(`Consumed event from topic ${TOPIC}: key = ${k} value = ${value}`);
  });

  consumer.subscribe([TOPIC]);
  consumer.consume();

  process.on('SIGINT', () => {
    console.log('\nDisconnecting consumer ...');
    consumer.disconnect();
  });
}

consumerExample()
  .catch((err) => {
    console.error(`Something went wrong:\n${err}`);
    process.exit(1);
  });