const Kafka = require('node-rdkafka');
const BROKER_SERVER_URL = 'localhost:9092';
const TOPIC = 'votes'

function createConfigMap() {
    return {
        'bootstrap.servers': BROKER_SERVER_URL,
        'dr_msg_cb': true
    }
}

function createProducer(onDeliveryReport) {

  const producer = new Kafka.Producer(createConfigMap());

  return new Promise((resolve, reject) => {
    producer
      .on('ready', () => resolve(producer))
      .on('delivery-report', onDeliveryReport)
      .on('event.error', (err) => {
        console.warn('event.error', err);
        reject(err);
      });
    producer.connect();
  });
}

async function produceExample() {
  const producer = await createProducer((err, report) => {
    if (err) {
      console.warn('Error producing', err)
    } else {
      const {topic, key, value} = report;
      let k = key.toString().padEnd(10, ' ');
      console.log(`Produced event to topic ${topic}: key = ${k} value = ${value}`);
    }
  });

  let numEvents = 10;
  for (let idx = 0; idx < numEvents; ++idx) {
    producer.produce(TOPIC, -1, Buffer.from('Message no.' + idx),'Index no.'+idx,);
  }

  producer.flush(10000, () => {
    producer.disconnect();
  });
}
module.exports = { produceExample }