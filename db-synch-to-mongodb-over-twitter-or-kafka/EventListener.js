var kafka = require('kafka-node');

// from the Oracle Event Hub - Platform Cluster Connect Descriptor

var client;

var APP_VERSION = "0.8.3"
var APP_NAME = "EventBusListener"

var eventListener = module.exports;

var kafka = require('kafka-node')
var Consumer = kafka.Consumer

var subscribers = [];

eventListener.subscribeToEvents = function (callback) {
    subscribers.push(callback);
}

var topicName =  "topic";

var kafkaConnectDescriptor = process.env.EVENT_HUB_PUBLIC_IP;

var consumerOptions = {
    host: kafkaConnectDescriptor,
    groupId: 'consume-order-events-for-JAPAC-database-synchronization',
    sessionTimeout: 15000,
    protocol: ['roundrobin'],
    fromOffset: 'earliest' // equivalent of auto.offset.reset valid values are 'none', 'latest', 'earliest'
};

var topics = [topicName];

console.log("Register EventListener at "+  kafkaConnectDescriptor + " for topic "+topics)
var consumerGroup = new kafka.ConsumerGroup(Object.assign({ id: 'consumer1' }, consumerOptions), topics);
consumerGroup.on('error', onError);
consumerGroup.on('message', onMessage);

// the code above for some reason does not work; so use plan B - the Consumer instead of the ConsumerGroup
var Consumer = kafka.Consumer
var client = new kafka.Client(kafkaConnectDescriptor)

var consumer = new Consumer(
  client,
  [],
  {fromOffset: true}
);

consumer.on('message', onMessage);

consumer.addTopics([
  { topic: topicName, partitions: 2, offset: 0}
], () => console.log(`topic ${topicName} added`));


function onMessage(message) {
    console.log('%s read msg Topic="%s" Partition=%s Offset=%d', this.client.clientId, message.topic, message.partition, message.offset);
    console.log("Message Value " + message.value)

    subscribers.forEach((subscriber) => {
        subscriber(message.value);

    })
}

function onError(error) {
    console.error(error);
    console.error(error.stack);
}

process.once('SIGINT', function () {
    async.each([consumerGroup], function (consumer, callback) {
        consumer.close(true, callback);
    });
});
