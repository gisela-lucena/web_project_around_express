import express from 'express';
import userRouter from './routes/users.js';
import cardRouter from './routes/cards.js';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '69cad9b26a66c83f2749b16a',
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

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Dados invalidos', error: err.message });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'ID inválido', error: err.message });
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(404).json({ message: 'Documento não encontrado', error: err.message });
  }

  res.status(500).json({ message: 'Erro interno do servidor', error: err.message });
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
