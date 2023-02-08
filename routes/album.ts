import { Router } from 'express';
import { query } from 'express-validator';

import { getAlbums } from '../controllers/album';

import { checkToken } from '../middlewares/check-token';
import { validateFields } from '../middlewares/validate-fields';

const router = Router();

router.get('/', [
  query('artist', 'The artist is required').notEmpty(),
  checkToken,
  validateFields
], getAlbums);

export default router;
