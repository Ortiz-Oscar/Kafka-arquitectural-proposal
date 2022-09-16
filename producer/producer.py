from confluent_kafka import Producer
import socket
from read_env import read_env_val
conf = {'bootstrap.servers': read_env_val('BROKER_URL'),
        'client.id': socket.gethostname()}

producer = Producer(conf)
topic = read_env_val('TOPIC')
def acked(err, msg):
    if err is not None:
        print("Failed to deliver message: %s: %s" % (str(msg), str(err)))
    else:
        print("Message produced: %s" % (str(msg)))
