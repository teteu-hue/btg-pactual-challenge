import { Response, Request } from "express";

async function index(req: Request, res: Response) {
    res.json({
        message: "Hello world From controller!"
    })
}

export default { index };
