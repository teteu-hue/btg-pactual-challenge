import { IValueMessagePayload } from "@src/Interface/DomainInterfaces";
import {
  createConsumer,
  disconnectConsumer,
} from "../Consumer/ConsumerConfig";
import { Consumer, Message } from "kafkajs";
import { OrderRepository } from "@src/repository/OrderRepository";
import { LogMeta } from "../../../logger/LogMeta";
import { Log } from "../../../logger/Log";
import { OrderProcessRepository } from "@src/model/orderProcess/OrderProcessRepository";

export default class ConsumerService {
  private consumer: Consumer | null = null;
  private isRunning: boolean = false;

  constructor(
    private orderRepository: OrderRepository,
    private orderProcessRepository: OrderProcessRepository
  ) {}

  DisconnectActualConsumer = async() => {
    if (this.consumer) {
        try {
          await disconnectConsumer(this.consumer);
        } catch (e) {
          console.warn("Erro ao desconectar consumer", e);
          throw new Error("Erro ao desconectar o consumer atual");
        }
      }
  }

  ConsumeMessage = async (groupId: string, topics: string[]) => {
    this.isRunning = true;

    const connect = async () => {
      try {
        await this.DisconnectActualConsumer();
        this.consumer = await createConsumer(groupId, topics);
        console.log("Consumer conectado e rodando!");
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
              
              const order: IValueMessagePayload = message.value ? JSON.parse(message.value.toString()) : '';
              if(!order) {
                return;
              }
              
              if(order.status_order !== "paid") {
                return;
              }
              try {

                  const createdOrder = await this.orderRepository.create(order);
                  if(createdOrder) {
                    const metaLog: LogMeta = {
                      action: "ConsumerService.ConsumeMessage",
                      createdAt: new Date().toISOString(),
                      success: true,
                      details: {
                        orderData: order,
                        topic: topic
                      }
                    }
                    Log.info("Dados persistidos para o banco de dados!", metaLog);
                  }

                  const orderProcess = await this.orderProcessRepository.findByOrderId(createdOrder.orderID);

                  if(!orderProcess) {
                    const metaLog: LogMeta = {
                      action: "ConsumerService.ConsumeMessage",
                      createdAt: new Date().toISOString(),
                      success: true,
                      details: {
                        orderData: orderProcess,
                        topic: topic
                      }
                    }
                    Log.info("Falha ao processar o pedido!", metaLog);
                    return;
                  }
                  
                  if(order.status_order === "paid") {
                    await this.orderProcessRepository.updateStatusToProcessed(orderProcess._id);
                    const metaLog: LogMeta = {
                      action: "ConsumerService.ConsumeMessage",
                      createdAt: new Date().toISOString(),
                      success: true,
                      details: {
                        orderData: orderProcess,
                        topic: topic
                      }
                    }
                    Log.info("Pedido processado com sucesso!", metaLog);
                  }


              } catch (err) {
                  const metaLog: LogMeta = {
                    action: "ConsumerService.ConsumeMessage",
                    createdAt: new Date().toISOString(),
                    success: false,
                    details: {
                      error: err,
                      orderData: order,
                      topic: topic
                    }
                  }
                  Log.error("Erro ao processar mensagem:", metaLog);
              }
            }
        });
        
      } catch(e) {
        console.warn(e);

        if(this.isRunning) {
            console.log("Tentando reconectar em 5 segundos...");
            setTimeout(connect, 5000);
        }
      }
    };

    await connect();

    process.on('SIGINT', async() => {
        this.isRunning = false;
        if(this.consumer) {
            await this.DisconnectActualConsumer();
        }
    });
  };

  stop = async () => {
    this.isRunning = false;
    if(this.consumer) {
        await this.DisconnectActualConsumer();
        this.consumer = null;
        console.log("Consumer parado manualmente!");
    }
  }
}
