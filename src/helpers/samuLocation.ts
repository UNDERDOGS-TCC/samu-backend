import axios from 'axios';
import {LatLng, MapsApiResponse} from '../interfaces/samuLocationBody';

export const closestSamuLocation = async (
  latitude: number,
  longitude: number,
  radius: number = 5000,
): Promise<LatLng> => {
  const apiKey = String(process.env.API_KEY);
  const config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Cgeometry&input=samu%20servico%20de%20emergencia&inputtype=textquery&locationbias=circle%3A${radius}%${latitude}%2C${longitude}&key=${apiKey}`,
    headers: {},
  };

  try {
    const response: MapsApiResponse = await axios(config);
    const location = response.data.candidates[0].geometry.location;
    return location;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};
