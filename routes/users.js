import { Router } from 'express';
import { createUser, getUsers, getUserById } from '../controllers/users.js';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.post('/', createUser);
userRouter.get('/:userId', getUserById);

export default userRouter;