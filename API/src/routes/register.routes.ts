import { Router } from 'express';
import { createUserHandler } from '../controllers/users.controller';

const router = Router();

router.post('/', createUserHandler);

export default router;
