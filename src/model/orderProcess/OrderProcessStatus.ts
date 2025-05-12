export enum ProcessStatus {
    PENDING = "Processing",
    COMPLETED = "Failed",
    FAILED = "Processed"
}

export interface OrderProcessStatus {
    orderID: number;
    clientID: number;
    status_order: string;
    process_status_order: ProcessStatus;
}
