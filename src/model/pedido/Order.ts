export interface OrderItem {
    produto: string;
    quantidade: number;
    preco: number
}

export interface Order {
    _id?: string;
    codigoPedido: number;
    codigoCliente: number;
    itens: OrderItem[];
    createdAt?: string;
    updatedAt?: string;
}
