import { Message } from "kafkajs";
import { Order } from "../model/pedido/Order";
import { OrderRepository } from "../repository/OrderRepository";
import kafkaMessageDispatcher from "./kafka/KafkaMessageDispatcher";
import { OrderProcessRepository } from "../model/orderProcess/OrderProcessRepository";
import { OrderProcessStatus, ProcessStatus } from "../model/orderProcess/OrderProcessStatus";

class OrderService {
    constructor(
        private orderRepository: OrderRepository,
        private orderProcessRepository: OrderProcessRepository
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
                //const { orderID, clientID, status_order } = JSON.parse(message.value.toString());
                //const orderProcessStatus: OrderProcessStatus = {
                //    orderID,
                //    clientID,
                //    status_order,
                //    process_status_order: ProcessStatus.PENDING
                //};
            }
        } catch (e) {
            throw new Error(e instanceof Error ? e.message : 'Unknown error');
        }
    }
}

const orderService = new OrderService(new OrderRepository, new OrderProcessRepository);
export default orderService;