import { Response, Request, NextFunction } from "express";
import {orderService} from "../../services/OrderService";
import {Message} from "kafkajs";

async function handle(req: Request, res: Response, next: NextFunction) {
    const topicName: string | null = req.body.topicName;
    const messages: Message[] = req.body.messages;

    if(!topicName) {
        return res.status(422).json({
                message: "Please check the body of request! Check our documentation."
            }
        ).end();
    }

    if(messages.length <= 0) {
        return res.status(204).end();
    }
    try {
        for(const message of messages) {
            await orderService.sendToKafka(topicName, {
                ...message,
                value: JSON.stringify(message.value)
            });
        }
        console.log(`Messages were sent successfully!`);
        return res.status(200).json({
            success: true,
            message: `Messages sent to topic ${topicName} with success!`
        }).end();
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: `Error to send message to Kafka: ${error instanceof Error ? error.message : 'Unknown error'}`
        }).end();
    }
}

export default { handle };