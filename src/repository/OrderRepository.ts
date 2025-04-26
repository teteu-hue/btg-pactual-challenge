import OrderModel from "../model/pedido/OrderModel";
import { Order } from "../model/pedido/Order";

export class OrderRepository {
    async create(orderData: Order) : Promise<Order> {
        const order = OrderModel.create(orderData);
        return await order;
    }

    async findAll(): Promise<Order[]> {
        try {
            const orders = await OrderModel.find().exec();
            return orders;
        } catch(e) {
            throw new Error("Error => " + e);
        }
    }

    async findById(id: string): Promise<Order | Error> {
        const order = await OrderModel.findById(id).exec();

        if(!order) {
            throw new Error("Order is not found!");
        }
        return order;
    }

    async update(id: string, orderData: Partial<Order>): Promise<Order> {
        const order = await OrderModel.findByIdAndUpdate(id, orderData, { new: true }).exec();

        if(!order) {
            throw new Error("Order is not found!");
        }
        return order;
    }
    
    async delete(id: string): Promise<boolean> {
        const result = await OrderModel.deleteOne( {_id: id} ).exec();
        return result.deletedCount === 1;
    }
}
