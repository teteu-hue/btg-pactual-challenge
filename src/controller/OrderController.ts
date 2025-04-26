import { Response, Request } from "express";
import { OrderRepository } from "../repository/OrderRepository";
import OrderService from "../services/OrderService";

const orderRepository = new OrderRepository();
const orderService = new OrderService();
async function index(req: Request, res: Response) {
    
    const response = await orderService.sendMessage();

    if(response) {
        return res.status(200).json(
            { message: "Mensagens enviadas com sucesso!" }
        );
    }
}

export default { index };