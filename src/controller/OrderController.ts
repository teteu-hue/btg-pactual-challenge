import { Response, Request } from "express";
import { OrderRepository } from "../repository/OrderRepository";

const orderRepository = new OrderRepository();

async function index(req: Request, res: Response) {

    const orders = await orderRepository.findAll();
    res.json({
        data: "Hello world!",
        body: orders
    });
}

export default { index };