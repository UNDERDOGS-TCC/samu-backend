import {Request, Response} from 'express';
import {randomLocationWithinRadius} from '../helpers/randomLocation';
import {RandomLocationBody} from '../interfaces/randomLocationBody';

export default {
  randomLocation: async (req: Request, res: Response) => {
    const {latitude, longitude, radius} = req.body as RandomLocationBody;

    if (!latitude || !longitude || !radius) {
      return res.status(200).json({
        message: 'Latitude, longitude ou raio faltando',
        success: false,
      });
    }

    const randomLatLng = randomLocationWithinRadius(
      latitude,
      longitude,
      radius,
    );

    return res.status(200).json({
      message: 'Localização aleatória gerada com sucesso',
      success: true,
      data: randomLatLng,
    });
  },
};
