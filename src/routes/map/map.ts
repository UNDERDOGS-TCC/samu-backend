import {Router} from 'express';
import mapController from '../../controllers/mapController';

const router = Router();

router.post(
  '/samuLocation',
  async (req, res) => await mapController.samuLocation(req, res),
);

export default router;
