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

var whitelist = ['http://localhost:5000', 'https://projeto-les-portaria-alvorada.vercel.app']

const corsOptions = {
  origin: function originWhitelist (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('não permitido pelo CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Access-Control-Allow-Credentials'
  ], 
  preflightContinue: true, 
  optionsSuccessStatus: 200
};

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

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}!`);
});
