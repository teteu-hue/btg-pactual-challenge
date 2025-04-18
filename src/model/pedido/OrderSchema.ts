import { Schema } from 'mongoose';
import { Order, OrderItem } from './Order';

const orderItemSchema = new Schema<OrderItem>({
    produto: { type: String, required: true },
    quantidade: { type: Number, required: true },
    preco: { type: Number, required: true }
});

export const orderSchema = new Schema<Order>({
    codigoPedido: { type: Number, required: true },
    codigoCliente: { type: Number, required: true },
    itens: { type: [orderItemSchema], required: true }
}, {
    timestamps: true,
    versionKey: false
});
