import {Router} from 'express';
import signupController from '../../controllers/signupController';

const router = Router();

router.post('/', (req, res) => signupController.signup(req, res));

export default router;
