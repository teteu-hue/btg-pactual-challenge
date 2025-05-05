import { createProducer, disconnectProducer } from "../config/kafka/Producer/ProducerConfig"
import { KafkaJSConnectionError, KafkaJSRequestTimeoutError, Message, Producer } from "kafkajs";
import { criarTopico } from "../config/kafka/KafkaConfig";
import KafkaMessageError from "config/kafka/error/KafkaMessageError";

export default class ProducerService {
    /**
     * Método responsável por enviar mensagens para o Kafka
     * @param topicName Nome do tópico
     * @param data Mensagem a ser enviada
     * @returns boolean
     */
    ProduceMessage = async (topicName: string, data: Message) => {
        const producer: Producer = await createProducer();

        try {
            await criarTopico(topicName);
            await producer.send({
                topic: topicName,
                messages: [data]
            });
            return;

        } catch (error) {         
            await this.handleErrors(error, topicName, producer, data);

        } finally {
            await disconnectProducer(producer);
        }
    }

    async handleErrors(e: unknown, topicName: string, producer: Producer, data: Message){
        switch(e) {
            case e instanceof KafkaJSRequestTimeoutError:
                setTimeout(() => 30000);
                await criarTopico(topicName);
                await producer.send({
                    topic: topicName,
                    messages: [data]
                });
                return "TimeOut resolved!";
            default:
                throw new KafkaMessageError("Erro ao produzir mensagem: " + e);
        }
    }
}

// const producerService = new ProducerService();
// export { producerService };
