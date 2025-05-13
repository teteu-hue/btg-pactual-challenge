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
};
