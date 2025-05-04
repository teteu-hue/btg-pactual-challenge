import { Router } from 'express';
import OrderController from '../controller/webhooks/OrderController';

const orderRouter = Router();

orderRouter.post('/webhook/orders', OrderController.handle);

export default orderRouter;