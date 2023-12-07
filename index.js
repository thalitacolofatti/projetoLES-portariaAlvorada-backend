import express from 'express';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import alunoRouter from './routes/students.js';
import guardianRouter from './routes/guardian.js';
import bondRouter from './routes/bond.js';
import searchRouter from './routes/search.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Access-Control-Allow-Credentials'
  ]
}

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/users/', userRouter);
app.use('/api/auth/', authRouter);
app.use('/api/alunos/', alunoRouter);
app.use('/api/responsaveis/', guardianRouter);
app.use('/api/vinculo/', bondRouter);
app.use('/api/buscar/', searchRouter);

app.listen(8002, () => {
  console.log('Servidor rodando na porta 8002!');
});