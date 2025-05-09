enum ProcessStatus {
    "Processing",
    "Failed",
    "Processed"
}

export interface OrderProcessStatus {
    orderID: number;
    clientID: number;
    status_order: string;
    process_status_order: string;
}
