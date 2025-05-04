import { createProducer, disconnectProducer } from "../config/kafka/Producer/ProducerConfig"
import { Message } from "kafkajs";
import { criarTopico } from "../config/kafka/KafkaConfig";

export default class ProducerService {
    /**
     * Método responsável por enviar mensagens para o Kafka
     * @param topicName Nome do tópico
     * @param data Mensagem a ser enviada
     * @returns boolean
     */
    ProduceMessage = async (topicName: string, data: Message) => {
        const producer = await createProducer();

        try {
            await criarTopico(topicName);
            await producer.send({
                topic: topicName,
                messages: [data]
            });
            return;

        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Erro ao enviar a mensagem para o Kafka: " + error.message);
            } else {
                throw new Error("Erro ao enviar a mensagem para o Kafka: " + String(error));
            }
        } finally {
            await disconnectProducer(producer);
        }
    }
}

// const producerService = new ProducerService();
// export { producerService };
