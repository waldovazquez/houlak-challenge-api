import { Router } from 'express';
import { query } from 'express-validator';

import {
  getUserByToken,
  login
} from '../controllers/auth';

import { validateFields } from '../middlewares/validate-fields';

const router = Router();

router.get('/login', login);

router.get('/getuser', [
  query('token', 'The token is required').notEmpty(),
  validateFields
], getUserByToken);

export default router;
