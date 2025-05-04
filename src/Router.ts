import { producerJob } from './cron/producerCron';
import HelloWorldController from './controller/HelloWorldController';
import { route, app } from './server';
import orderRouter from './router/orders.router';

route.get('/', HelloWorldController.index);

app.use(orderRouter);
app.listen(3000, () => {
    producerJob.start();
    console.log("Server running in the port 3000");
    console.log("CronJobs is running!");
});
