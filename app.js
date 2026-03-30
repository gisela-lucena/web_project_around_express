import express from 'express';
import userRouter from './routes/users.js';
import cardRouter from './routes/cards.js';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '69c6f4e1c4bed68f263673b8',
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    message: 'Rota não encontrada',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB', err);
  });
