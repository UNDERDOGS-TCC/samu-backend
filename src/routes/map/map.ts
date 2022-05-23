import {Router} from 'express';
import mapController from '../../controllers/mapController';

const router = Router();

router.post(
  '/randomLocation',
  async (req, res) => await mapController.randomLocation(req, res),
);

export default router;
