import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const cardRouter = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cardsPath = path.join(__dirname, '../data/cards.json');

cardRouter.get('/', (req, res) => {
 fs.readFile(cardsPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send({ message: 'Erro ao ler os cards' });
    }
    res.send(JSON.parse(data));
  });
});

export default cardRouter;