import { IValueMessagePayload } from "@src/Interface/DomainInterfaces";
import {
  createConsumer,
  disconnectConsumer,
} from "../Consumer/ConsumerConfig";
import { Consumer, Message } from "kafkajs";
import { OrderRepository } from "@src/repository/OrderRepository";

export default class ConsumerService {
  private consumer: Consumer | null = null;
  private isRunning: boolean = false;

  constructor(
    private orderRepository: OrderRepository
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
                    console.log("Dados persistidos para o banco de dados!");
                  }

              } catch (err) {
                  console.error("Erro ao processar mensagem:", err);
              }
            }
        });
        console.log("Consumer conectado e rodando!");
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
