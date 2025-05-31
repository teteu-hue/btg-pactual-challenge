import { Application, Router } from 'express';
import WebhookController from '../controller/webhooks/WebhookController';

const webhookRouter: Router = Router();

webhookRouter.post('/webhook/orders', WebhookController.index);

export default webhookRouter;
