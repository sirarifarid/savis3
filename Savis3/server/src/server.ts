import express, { Request, Response } from 'express';
import cors from 'cors';
// Uncomment this line for firebase-admin
// import * as admin from 'firebase-admin';

const app = express();

app.get('/', (req: Request, res: Response) => res.send('Hello World!'))

const PORT = 3000
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})

app.use(cors({
    origin: 'http://localhost:4200'
}))

app.get('/api/test', (req, res) => res.json({ message: 'Hello from backend!' }));
