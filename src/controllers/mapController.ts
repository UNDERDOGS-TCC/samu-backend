import {Request, Response} from 'express';
import {closestSamuLocation} from '../helpers/samuLocation';
import {SamuLocationBody} from '../interfaces/samuLocationBody';

export default {
  samuLocation: async (req: Request, res: Response) => {
    const {latitude, longitude} = req.body as SamuLocationBody;

    if (!latitude || !longitude) {
      return res.status(200).json({
        message: 'Latitude ou longitude faltando',
        success: false,
      });
    }

    const LatLng = closestSamuLocation(latitude, longitude);

    return res.status(200).json({
      message: 'Localização encontrada com sucesso',
      success: true,
      data: LatLng,
    });
  },
};
