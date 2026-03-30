import { Router } from 'express';
import { createUser, getUsers, getUserById, patchUser, patchAvatar } from '../controllers/users.js';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.post('/', createUser);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', patchUser);
userRouter.patch('/me/avatar', patchAvatar);

export default userRouter;