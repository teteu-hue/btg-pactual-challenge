import { Response, Request } from "express";
import { Message } from "kafkajs";
import { Order } from "../../model/pedido/Order";
import { orderRepository } from "../../repository/OrderRepository";
import kafkaMessageDispatcher from "../../services/kafka/KafkaMessageDispatcher";

async function index(req: Request, res: Response) {
  const topicName: string | null = req.body.topicName;
  const messages: Message[] = req.body.messages;

  if (!topicName) {
    return res
      .status(422)
      .json({
        message: "Please check the body of request! Check our documentation.",
      })
      .end();
  }

  if (messages.length <= 0) {
    return res.status(204).end();
  }
  try {
    for (const message of messages) {
      await kafkaMessageDispatcher.dispatch(topicName, {
        ...message,
        value: JSON.stringify(message.value),
      });
    }
    console.log(`Messages were sent successfully!`);
    return res
      .status(200)
      .json({
        success: true,
        message: `Messages sent to topic ${topicName} with success!`,
      })
      .end();
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: `Error to send message to Kafka: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      })
      .end();
  }
}

async function test(req: Request, res: Response) {
  const order: Order = req.body.bodyOrder;
  
  try {
    const created_order = await orderRepository.create(order);

    if(!created_order) {
      return res.status(400).json({
        success: false,
        message: "A error happens in OrderDatabaseCreated!"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order created with success!",
      data: created_order
    });

  } catch(e) {
    return res.status(500).json({
      status: false,
      message: "A Unknown error happens! Please check the logs."
    });
  }
}

export default { index, test };