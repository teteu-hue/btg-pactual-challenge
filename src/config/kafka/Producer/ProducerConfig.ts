import { Producer } from "kafkajs";
import { kafka } from "../KafkaConfig";

const createProducer = async(): Promise<Producer> => {
    const producer = kafka.producer();
    await producer.connect();
    return producer;
}

const disconnectProducer = async(producer: Producer): Promise<void> => {
    await producer.disconnect();
}

export { createProducer, disconnectProducer };