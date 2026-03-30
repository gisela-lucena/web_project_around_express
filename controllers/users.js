import { User } from '../models/users.js';
import mongoose from 'mongoose';

export const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(400).json({ message: 'Erro ao criar usuário', error: err.message }));
};

export const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ message: 'Erro ao buscar usuários', error: err.message }));
};

export const getUserById = (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'ID do usuário não encontrado' });
      }
      return res.json(user);
    })
    .catch((err) => res.status(500).json({ message: 'Erro ao buscar usuário', error: err.message }));
};
