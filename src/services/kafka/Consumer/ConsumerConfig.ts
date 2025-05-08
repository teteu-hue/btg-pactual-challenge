import { Consumer, ConsumerConfig } from 'kafkajs';
import { kafka } from '../KafkaConfig';

const createConsumer = async(groupId: string, topics: string[]): Promise<Consumer> => {
    const consumerConfig: ConsumerConfig = {
        groupId,
        sessionTimeout: 30000,
        heartbeatInterval: 3000,
        retry: {
            initialRetryTime: 300,
            retries: 10
        }
    };

    try {
        const consumer: Consumer = kafka.consumer(consumerConfig);
        await consumer.connect();
        await subscribeTopics(consumer, topics);
        return consumer;
    } catch(e) {
        throw new Error(`Consumer configuration FAILED! => ${e}`);
    }
}

const subscribeTopics = async (consumer: Consumer, topics: string[]) => {
    for(const topic of topics) {
        await consumer.subscribe({topic, fromBeginning: true});
    }
}

const disconnectConsumer = async(consumer: Consumer): Promise<void> => {
    await consumer.disconnect();
}

export { createConsumer, disconnectConsumer };