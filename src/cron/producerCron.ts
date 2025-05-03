import { CronJob } from 'cron';
import axios from 'axios';
import 'dotenv/config';

const api: AxiosInstance = axios.create({
    baseURL: process.env.producer_order_URL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
    }
});

const payload = {
    "topicName": "orders",
    "messages": [
      {
        "key": "codigoCliente",
        "value": {
          "codigoPedido": 1001,
          "codigoCliente": 1,
          "valorTotal": 120,
          "itens": [
            { "produto": "lápis", "quantidade": 100, "preco": 1.1 },
            { "produto": "caderno", "quantidade": 10, "preco": 1.0 }
          ],
          "dataCriacao": "2025-05-01T12:00:00Z"
        },
        "timestamp": "1746100800000"
      },
      {
        "key": "codigoCliente",
        "value": {
          "codigoPedido": 1002,
          "codigoCliente": 2,
          "valorTotal": 120,
          "itens": [
            { "produto": "lápis", "quantidade": 100, "preco": 1.1 },
            { "produto": "caderno", "quantidade": 10, "preco": 1.0 }
          ],
          "dataCriacao": "2025-05-02T12:00:00Z"
        },
        "timestamp": "1746187200000"
      },
      {
        "key": "codigoCliente",
        "value": {
          "codigoPedido": 1003,
          "codigoCliente": 3,
          "valorTotal": 120,
          "itens": [
            { "produto": "lápis", "quantidade": 100, "preco": 1.1 },
            { "produto": "caderno", "quantidade": 10, "preco": 1.0 }
          ],
          "dataCriacao": "2025-05-03T12:00:00Z"
        },
        "timestamp": "1746273600000"
      },
      {
        "key": "codigoCliente",
        "value": {
          "codigoPedido": 1004,
          "codigoCliente": 4,
          "valorTotal": 120,
          "itens": [
            { "produto": "lápis", "quantidade": 100, "preco": 1.1 },
            { "produto": "caderno", "quantidade": 10, "preco": 1.0 }
          ],
          "dataCriacao": "2025-05-03T12:00:00Z"
        },
        "timestamp": "1746273600000"
      }
    ]
};

const producerJob = new CronJob(
    "* 1 * * * *",
    async function() {
        try {
            await api.post('webhook/orders', payload);

        } catch(e) {
            console.error(e);
        }
    }
);

export { producerJob };
