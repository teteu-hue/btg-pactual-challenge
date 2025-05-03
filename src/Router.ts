import { producerJob } from './cron/producerCron';
import HelloWorldController from './controller/HelloWorldController';
import OrderController from './controller/webhooks/OrderController';
import { route, app } from './server';

route.get('/', HelloWorldController.index);
route.post('/webhook/orders', OrderController.handle);

app.listen(3000, () => {
    producerJob.start();
    console.log("Server running in the port 3000");
    console.log("CronJobs is running!");
});
