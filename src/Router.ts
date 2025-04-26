import HelloWorldController from './controller/HelloWorldController';
import OrderController from './controller/OrderController';
import { route, app } from './server';

route.get('/', HelloWorldController.index);
route.get('/teste', OrderController.index);

app.listen(3000, () => {
    console.log("Server running in the port 3000");
});
