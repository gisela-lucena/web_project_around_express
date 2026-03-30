import { Card } from '../models/cards.js';
import mongoose from 'mongoose';

export const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.json(cards))
    .catch((err) =>
      res.status(500).json({ message: 'Erro ao buscar cartões', error: err.message  })
   );
  };

export const createCard = (req, res) => {
  console.log('USER ID:', req.user._id);
  const { name, link } = req.body;
  const owner = req.user?._id;

    Card.create({ name, link, owner })
      .then((card) => res.status(201).json(card))
      .catch((err) =>
        res.status(400).json({ message: 'Erro ao criar cartão', error: err.message })
    );
};

export const deleteCard = (req, res) => {
  const { cardId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return res.status(400).json({ message: 'ID inválido' });
  }
    
   Card.findByIdAndDelete(cardId)
        .then(card =>{
          if(!card) {
            return res.status(404).json({ message: 'Cartão não encontrado' });
          }
          return res.json({message: 'Cartão deletado' });
        })
        .catch(() => 
          res.status(500).json({ message: 'Erro ao deletar cartão' })
      );
    };