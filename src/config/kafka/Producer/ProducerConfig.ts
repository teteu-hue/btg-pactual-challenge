import { Producer } from "kafkajs";
import { kafka } from "../KafkaConfig";

const createProducer = async(): Promise<Producer> => {
    const producer = kafka.producer({
        transactionalId: 'producer-order-clients', // With this attribute Kafka allows all messages to be sent within a transaction.
        maxInFlightRequests: 1, // With this attribute the producer sends only one message at a time. 
        idempotent: true,  // With this attribute Kafka ensures that if there is a network error, the message will be recorded only once per topic.
        retry: { retries: 2147483647 }
    });
    await producer.connect();
    return producer;
}

const disconnectProducer = async(producer: Producer): Promise<void> => {
    await producer.disconnect();
}

export { createProducer, disconnectProducer };