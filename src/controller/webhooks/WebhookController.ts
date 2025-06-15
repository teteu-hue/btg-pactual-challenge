import { Response, Request } from "express";
import { Message } from "kafkajs";
import { Order } from "../../model/pedido/Order";
import { orderRepository } from "../../repository/OrderRepository";
import orderService from "../../services/OrderService";
import { Log } from "../../logger/Log";
import { LogMeta } from "@src/logger/LogMeta";

async function index(req: Request, res: Response) {
  const topicName: string | null = req.body.topicName;
  const messages: Message[] = req.body.messages;

  if (!topicName) {
    const metaLog: LogMeta =  {
      action: "OrderController.index", 
      success: false, 
      createdAt: new Date().toISOString(),
      details: {
        ip: req.ip,
        userAgent: req.headers['user-agent']
      }
    };
    Log.error("Topic name is not informed in request!", metaLog);
    return res
      .status(422)
      .json({
        message: "Please check the body of request! Check our documentation.",
      })
      .end();
  }

  if (messages.length <= 0) {
    const metaLog: LogMeta =  {
      action: "OrderController.index", 
      success: false, 
      createdAt: new Date().toISOString(),
      details: {
        ip: req.ip,
        userAgent: req.headers['user-agent']
      }
    };
    Log.error("Messages are not informed in request!", metaLog);
    return res.status(204).end();
  }
  try {
    const metaLog: LogMeta =  {
      action: "OrderController.index", 
      createdAt: new Date().toISOString(),
      details: {
        ip: req.ip,
        userAgent: req.headers['user-agent']
      }
    }
    Log.info("Processing orders from topic: " + topicName, metaLog);
    
    orderService.produceOrders(topicName, messages).then((success) => {
      metaLog.success = true;

      Log.info(`Messages were sent successfully!`, metaLog);
    });

    return res
      .status(200)
      .json({
        success: true,
        message: `Messages sent to topic ${topicName} with success!`,
      })
      .end();

  } catch (error) {
    console.error(error);
    const metaLog: LogMeta =  {
      action: "OrderController.index", 
      createdAt: new Date().toISOString(),
      success: false,
      details: {
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        error: error instanceof Error ? error.message : "Unknown error"
      }
    };
    Log.error("Error while processing orders!", metaLog);
    return res
      .status(500)
      .json({
        success: false,
        message: `Error: ${
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