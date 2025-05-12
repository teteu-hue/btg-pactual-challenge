import { Message } from "kafkajs";
import { Order } from "../model/pedido/Order";
import { OrderRepository } from "../repository/OrderRepository";
import kafkaMessageDispatcher from "./kafka/KafkaMessageDispatcher";

class OrderService {
    constructor(
        private orderRepository: OrderRepository
    ) { }

    createOrder = async (order: Order) => {
        try {
            const createdOrder = await this.orderRepository.create(order);

            if (!createdOrder) {
                return false;
            }

            return createdOrder;
        } catch (e) {
            throw new Error(e instanceof Error ? e.message : 'Unknown error');
        }
    }

    processOrders = async (topicName: string, messages: Message[]) => {
        try {
            for (const message of messages) {
                if (!message.value) {
                    continue; // Implementar posteriormente logs do que foi recebido na mensagem.        
                }
                await kafkaMessageDispatcher.dispatch(topicName, {
                    ...message,
                    value: JSON.stringify(message.value),
                });
                const { orderID, clientID, status_order } = JSON.parse(message.value.toString());
                
            }
        } catch (e) {
            throw new Error(e instanceof Error ? e.message : 'Unknown error');
        }
    }
}

const orderService = new OrderService(new OrderRepository);
export default orderService;