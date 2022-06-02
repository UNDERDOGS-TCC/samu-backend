import {Request, Response} from 'express';
import {closestSamuLocation} from '../helpers/samuLocation';
import {SamuLocationBody} from '../interfaces/samuLocationBody';

export default {
  samuLocation: async (req: Request, res: Response) => {
    const {latitude, longitude, radius} = req.body as SamuLocationBody;

    if (!latitude || !longitude) {
      return res.status(200).json({
        message: 'Latitude ou longitude faltando',
        success: false,
      });
    }

    const LatLng = await closestSamuLocation(latitude, longitude, radius);

    if (!LatLng.lat || !LatLng.lng) {
      return res.status(200).json({
        message: 'Ocorreu um erro ao buscar a localização',
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Localização encontrada com sucesso',
      success: true,
      data: LatLng,
    });
  },
};
