import {Router} from 'express';
import userController from '../../controllers/userController';

const router = Router();

router.post('/login', async (req, res) => await userController.login(req, res));

router.post(
  '/signup',
  async (req, res) => await userController.signup(req, res),
);

export default router;
