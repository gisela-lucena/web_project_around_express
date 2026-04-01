import express from 'express';
import userRouter from './routes/users.js';
import cardRouter from './routes/cards.js';
import mongoose from 'mongoose';
import { errorHandler }from './middlewares/errorHandler.js';
import { notFoundRoute } from './middlewares/notFoundRoute.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(errorHandler);
app.use(notFoundRoute);

app.use((req, res, next) => {
  req.user = {
    _id: '69cd21f4bd7ccfadac4f4197',
  };
  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

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
