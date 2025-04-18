import express, { Router, Request, Response } from 'express';

const app = express();
const route = Router();

app.use(express.json());

app.use(route);

export { route, app }
