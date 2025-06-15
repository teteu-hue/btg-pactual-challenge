import { Application, Router } from 'express';
import WebhookController from '../controller/webhooks/WebhookController';
import OrderController from '../controller/OrderController';

const orderRouter: Router = Router();

orderRouter.get('/quantity/:clienteId', OrderController.getOrderQuantityByClient);
orderRouter.get('/list/:clienteId', OrderController.getOrderListByClient);
orderRouter.get('/total/:codigoPedido', OrderController.getOrderTotalByCodigo);

export default orderRouter;
