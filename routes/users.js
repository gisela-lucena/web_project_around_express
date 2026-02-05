import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const userRouter = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersPath = path.join(__dirname, '../data/users.json');

userRouter.get('/', (req, res) => {
 fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send({ message: 'Erro ao ler os usuários' });
    }
    res.send(JSON.parse(data));
  });
});

// GET /users/:userId → usuário por ID
userRouter.get('/:userId', (req, res) => {
  const { userId } = req.params;

  fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send({ message: 'Erro ao ler os usuários' });
    }

    const users = JSON.parse(data);
    const user = users.find(u => u._id === userId);

    if (!user) {
      return res
        .status(404)
        .send({ message: 'ID do usuário não encontrado' });
    }

    res.send(user);
  });
});

module.exports = userRouter;