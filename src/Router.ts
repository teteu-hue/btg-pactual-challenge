import { producerJob } from './cron/producerCron';
import HelloWorldController from './controller/HelloWorldController';
import { route, app } from './server';
import orderRouter from './router/orders.router';
import ConsumerService from './services/kafka/services/ConsumerService';
import { OrderRepository } from './repository/OrderRepository';
import webhookRouter from './router/webhook.router';
import { OrderProcessRepository } from './model/orderProcess/OrderProcessRepository';

route.get('/', HelloWorldController.index);
app.use(orderRouter);
app.use(webhookRouter);

app.listen(3000, () => {
    producerJob.start();
    new ConsumerService(new OrderRepository, new OrderProcessRepository).ConsumeMessage('my-group', ['orders']).catch(e => console.error(`Error in consumer`));
    console.log("Server running in the port 3000");
    console.log("CronJobs is running!");
});
