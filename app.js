import express from 'express';
import userRouter from './routes/users.js';
import cardRouter from './routes/cards.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/users', userRouter);
app.use('/cards', cardRouter);

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ 
    message: 'Rota não encontrada' 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
