import { Order } from "../model/pedido/Order";
import { OrderRepository } from "../repository/OrderRepository";

class OrderService {
    constructor(
        private orderRepository: OrderRepository
    ) {}

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

const orderService = new OrderService(new OrderRepository);
export {orderService};