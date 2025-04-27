import ProducerService from "./ProducerService";
import {Message} from "kafkajs";

class OrderService {
    constructor(
        private producerService: ProducerService
    ) {}

    sendToKafka = async (topicName: string, message: Message) => {
        try {
            await this.producerService.ProduceMessage(topicName, message);
        } catch (e) {
            console.error(e);
        }

    };
}

const orderService = new OrderService(new ProducerService());
export {orderService};