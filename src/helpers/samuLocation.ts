import axios from 'axios';
import {LatLng, MapsApiResponse} from '../interfaces/samuLocationBody';

export const closestSamuLocation = async (
  latitude: number,
  longitude: number,
  radius: number = 5000,
): Promise<LatLng> => {
  const apiKey = String(process.env.API_KEY);
  const apiString = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=samu%20servico%20de%20emergencia&location=${latitude}%2C${longitude}&radius=${radius}&key=${apiKey}`;
  const config = {
    method: 'get',
    url: apiString,
    headers: {},
  };

  try {
    const response: MapsApiResponse = await axios(config);
    const location = response.data.results[0].geometry.location;
    return location;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};
