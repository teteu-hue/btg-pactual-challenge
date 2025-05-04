import { Order } from "../model/pedido/Order";
import ProducerService from "./ProducerService";
import {Message} from "kafkajs";
import { OrderRepository } from "../repository/OrderRepository";

class OrderService {
    constructor(
        private producerService: ProducerService,
        private orderRepository: OrderRepository
    ) {}

    sendToKafka = async (topicName: string, message: Message) => {
        try {
            await this.producerService.ProduceMessage(topicName, message);
        } catch (e) {
            throw new Error(`ORDER SERVICE ERROR => ${e ? console.log(e) : 'Error'}`);
        }

    };

    createOrder = async (order: Order) => {
        try {
            const createdOrder = await this.orderRepository.create(order);

            if(!createdOrder) {
                return false;
            }
            
            return createdOrder;
        } catch(e) {
            throw new Error(e instanceof Error ? e.message : 'Unknown error');
        }
    }
}

const orderService = new OrderService(new ProducerService(), new OrderRepository);
export {orderService};