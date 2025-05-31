import { Types } from "mongoose";
import { OrderProcessStatus } from "./OrderProcessStatus";
import OrderProcessStatusModel from "./orderProcessStatusModel";

export class OrderProcessRepository {

    create = async(orderProcessStatus: OrderProcessStatus) => {
        try {
            await OrderProcessStatusModel.create(orderProcessStatus);
            return true;
        } catch(e) {
            throw new Error(e instanceof Error ? e.message : "Erro ao criar o registro de processamento de pedido");
        }
    }

    findByOrderId = async(id: number) => {
        try {
            const orderProcess = await OrderProcessStatusModel.findOne({ orderID: id });
            return orderProcess;
        } catch(e) {
            throw new Error(e instanceof Error ? e.message : "Erro ao buscar o registro de processamento de pedido");
        }
    }

    updateStatusToProcessed = async(id: Types.ObjectId) => {
        try {
            const orderProcess = await OrderProcessStatusModel.findByIdAndUpdate(id, { process_status_order: "Processed" });
            return orderProcess;
        } catch(e) {
            throw new Error(e instanceof Error ? e.message : "Erro ao atualizar o status do registro de processamento de pedido");
        }
    }
};
