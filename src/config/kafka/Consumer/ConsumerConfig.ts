import { Consumer, ConsumerConfig } from 'kafkajs';
import { kafka } from '../KafkaConfig';

const createConsumer = async(groupId: string, topics: string[]): Promise<Consumer> => {
    const consumerConfig: ConsumerConfig = {
        groupId,
        sessionTimeout: 30000
    };

    const consumer = kafka.consumer(consumerConfig);

    for(const topic of topics) {
        await consumer.subscribe({topic, fromBeginning: true});
    }

    return consumer;
}

const disconnectConsumer = async(consumer: Consumer): Promise<void> => {
    await consumer.disconnect();
}

export { createConsumer, disconnectConsumer };