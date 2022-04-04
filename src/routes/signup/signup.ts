import {Router} from 'express';
import signupController from '../../controllers/signupController';

const router = Router();

router.post('/', async (req, res) => await signupController.signup(req, res));

export default router;
