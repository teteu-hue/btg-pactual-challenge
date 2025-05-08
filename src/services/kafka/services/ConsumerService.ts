import { create } from "axios";
import {
  createConsumer,
  disconnectConsumer,
} from "../Consumer/ConsumerConfig";
import { Consumer, Message } from "kafkajs";

export default class ConsumerService {
  private consumer: Consumer | null = null;
  private isRunning: boolean = false;

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
                try {
                    console.log("Message consumed!: ");
                    console.log({
                        topic,
                        partition,
                        offset: message.offset,
                        key: message.key?.toString(),
                        value: message.value?.toString(),
                        headers: message.headers
                    });
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
