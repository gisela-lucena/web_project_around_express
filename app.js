const express = require('express');

const app = express();
const PORT = 3000;

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
