import { Message } from "kafkajs";
import ProducerService from "./services/ProducerService";
import KafkaMessageError from "./error/KafkaMessageError";

class KafkaMessageDispatcher {
    constructor(
        private producerService: ProducerService
    ){}

    async dispatch(topicName: string, message: Message) {
        try {
            return await this.producerService.ProduceMessage(topicName, message);
        } catch(e) {
            throw new KafkaMessageError("Falha ao enviar mensagem para o Kafka algum erro ocorreu!", "500");
        }
    }
}

const kafkaMessageDispatcher = new KafkaMessageDispatcher(new ProducerService());
export default kafkaMessageDispatcher;
