import {Router} from 'express';
import loginController from '../../controllers/loginController';

const router = Router();

router.post('/', (req, res) => loginController.login(req, res));

export default router;
