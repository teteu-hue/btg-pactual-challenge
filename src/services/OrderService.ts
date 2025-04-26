import { criarTopico } from "../config/kafka/KafkaConfig";
import { createProducer, disconnectProducer } from "../config/kafka/Producer/ProducerConfig"

export default class OrderService {

    sendMessage = async () => {
        const producer = await createProducer();

        try {
            await criarTopico('teste');
            await producer.send({
                topic: 'teste',
                messages: [
                    { value: JSON.stringify({mensagem: "Hello world!"}) },
                    { value: JSON.stringify({mensagem: "Olá, Kafka!"}) }
                ]
            });
            return true;
        } catch(error) {
            console.error('Erro ao enviar mensagem: ', error);
        } finally {
            await disconnectProducer(producer);
        }
    }
}