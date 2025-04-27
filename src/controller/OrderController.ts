import { Response, Request } from "express";
import {orderService} from "../services/OrderService";
import {Message} from "kafkajs";

async function index(req: Request, res: Response) {
    const topicName: string | null = req.body;
    const messages: Message[{ key: string; value: {}, timestamps: string }] = req.body;

    if(!topicName) {
        return res.status(422).json({
                message: "Please check the body of request! Check our documentation."
            }
        );
    }
    try {
        for(const message: Message of messages) {
            await orderService.sendToKafka(topicName, messages);
        }
        console.log(`Messages were sent successfully!`);
        return res.status(200).json({
            success: true,
            message: `Messages sent to topic ${topicName} with success!`
        })
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: `Error to send message to Kafka: ${error.message}`
        });
    }
}

export default { index };