import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const api = express();
const port = process.env.PORT || 8081;

api.use(express.json(), cors());

api.get('/users', async (req, res) => {
    const userList = await prisma.users.findMany();
    res.status(200).send(userList);
});

api.post('/users/', async (req, res) => {
    const { author, title, message } = req.body;
    await prisma.users.create({ data: { author, title, message } });
    return res.status(200).send('ok');
});

api.listen(port, () => `server is listening on port ${port}`);
