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
            throw new Error(`ORDER SERVICE ERROR => ${e ? console.log(e) : 'Error'}`);
        }

    };
}

const orderService = new OrderService(new ProducerService());
export {orderService};