# 🛣️ Roadmap do Projeto - Microserviço com Kafka + MongoDB + API REST

## 📌 Objetivo

Criar um microserviço que consome pedidos de um tópico Kafka e os armazena no MongoDB, com uma API REST que retorna:

- Valor total do pedido
- Quantidade de pedidos por cliente
- Lista de pedidos de um cliente

---

## ✅ Etapa 1 – Planejamento e Arquitetura

**⏱️ Duração: 4 horas**

- [ ] Definir arquitetura geral:
  - Kafka com **1 tópico** chamado `pedidos`, particionado por `codigoCliente`
  - MongoDB com **uma única coleção** chamada `pedidos`
- [ ] Escolher tecnologias:
  - Node.js + TypeScript
  - KafkaJS
  - Mongoose
  - Express

---

## ⚙️ Etapa 2 – Setup do Ambiente com Docker

**⏱️ Duração: 4 horas**

- [X] Criar `docker-compose.yml` com:
  - Kafka + Zookeeper
  - MongoDB
  - Mongo Express (opcional)
  - Aplicação Node rodando automaticamente (`ts-node-dev`)
- [X] Configurar `.env` com:
  - `KAFKA_BROKER`
  - `MONGO_URI=mongodb://mongodb:27017/pedidosdb`

---

## 🛠️ Etapa 3 – Desenvolvimento do Microserviço Kafka

**⏱️ Duração: 8 horas**

- [ ] Conectar ao tópico `pedidos` usando KafkaJS
- [ ] Configurar o consumidor com partições e chave (`codigoCliente`)
- [ ] Processar a mensagem e calcular o `valorTotal`
- [ ] Salvar a mensagem no MongoDB:
  ```json
  {
    "codigoPedido": 1001,
    "codigoCliente": 1,
    "valorTotal": 120,
    "itens": [
      { "produto": "lápis", "quantidade": 100, "preco": 1.1 },
      { "produto": "caderno", "quantidade": 10, "preco": 1.0 }
    ],
    "dataCriacao": "2025-04-12T12:00:00Z"
  }
  ```

---

## 🧩 Etapa 4 – Modelagem do MongoDB

**⏱️ Duração: 4 horas**

- [ ] Criar o schema do pedido (Mongoose)
- [ ] Utilizar uma única coleção `pedidos`

---

## 🌐 Etapa 5 – Criação da API REST com Express

**⏱️ Duração: 6 horas**

- [ ] Endpoint: `GET /order/quantity/:clienteId`  
  → Retorna a quantidade de pedidos por cliente

- [ ] Endpoint: `GET /order/list/:clienteId`  
  → Retorna a lista de pedidos por cliente

- [ ] Endpoint: `GET /order/total/:codigoPedido`  
  → Retorna o valor total de um pedido

### 🔁 Exemplo de Respostas

```json
// GET /order/quantity/1
{ "clienteId": 1, "quantidadePedidos": 3 }

// GET /order/list/1
[
  {
    "codigoPedido": 1001,
    "valorTotal": 120,
    "itens": [...]
  }
]

// GET /order/total/1001
{ "codigoPedido": 1001, "valorTotal": 120 }
```

---

## 🧪 Etapa 6 – Testes e Validação

**⏱️ Duração: 6 horas**

- [ ] Validar consumo do Kafka e persistência no banco
- [ ] Testar manualmente os endpoints
- [ ] Criar testes automatizados com Jest (opcional)

---

## 📚 Etapa 7 – Documentação e Entrega

**⏱️ Duração: 4 horas**

- [ ] Documentar a API (Swagger opcional)
- [ ] Criar `README.md` com:
  - Instruções de setup com Docker
  - Comandos para testes locais

---

## 📊 Resumo Visual

| Etapa        | Tarefa                                | Tempo Estimado |
|--------------|----------------------------------------|----------------|
| Planejamento | Arquitetura + tecnologias              | 4h             |
| Setup        | Docker + .env                          | 4h             |
| Microserviço | Kafka + consumo                        | 8h             |
| MongoDB      | Modelagem + persistência               | 4h             |
| API REST     | Endpoints com Express                  | 6h             |
| Testes       | Unitários e integração                 | 6h             |
| Docs         | README + documentação da API           | 4h             |
| **Total**    |                                        | **36 horas**   |

---