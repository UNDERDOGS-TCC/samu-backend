import {Router} from 'express';
import userController from '../../controllers/userController';

const router = Router();

router.post('/login', async (req, res) => await userController.login(req, res));

router.post(
  '/signup',
  async (req, res) => await userController.signup(req, res),
);

router.post(
  '/update',
  async (req, res) => await userController.update(req, res),
);

router.get(
  '/:id',
  async (req, res) => await userController.getUserById(req, res),
);

router.post(
  '/resetpassword',
  async (req, res) => await userController.resetPassword(req, res),
);

export default router;
