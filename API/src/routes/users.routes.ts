import { Router } from 'express';
import auth from '../middlewares/auth';
import isAdmin from '../middlewares/isAdmin';
import authAdminOrUser from '../middlewares/authAdminOrUser';
import {
  getAllUsersHandler,
  getUserByIdHandler,
  deleteUserHandler,
  updateUserHandler,
  patchUserHandler,
  getMeHandler,
} from '../controllers/users.controller';

const router = Router();

router.get('/users', isAdmin, getAllUsersHandler);
router.get('/user/:id', authAdminOrUser, getUserByIdHandler);
router.delete('/user/:id', authAdminOrUser, auth, deleteUserHandler);
router.put('/user/:id', authAdminOrUser, auth, updateUserHandler);
router.patch('/user/:id', authAdminOrUser, auth, patchUserHandler);
router.get('/me', auth, getMeHandler);

export default router;
