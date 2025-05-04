import { Application, Router } from 'express';
import OrderController from '../controller/webhooks/OrderController';

const orderRouter: Router = Router();

orderRouter.post('/orders/getAll', OrderController.test);
orderRouter.post('/webhook/orders', OrderController.index);

export default orderRouter;