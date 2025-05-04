export interface IProducerMessagePayload {
    topicName: string;
    messages: IMessagePayload[];
}

interface IMessagePayload {
    key: string;
    value: IValueMessagePayload;
    timestamp: string;
}

interface IValueMessagePayload {
    orderID: number;
    clientID: number;
    grossValue: number;
    items: IItemsMessagePayload[];
    created_at: string;
}

interface IItemsMessagePayload {
    product: string;
    quantity: number;
    price: number;
}
