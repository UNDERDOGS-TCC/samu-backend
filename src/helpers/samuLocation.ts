import axios from 'axios';
import {LatLng, MapsApiResponse} from '../interfaces/samuLocationBody';

export const closestSamuLocation = async (
  latitude: number,
  longitude: number,
  radius: number = 5000,
): Promise<LatLng> => {
  const apiKey = String(process.env.API_KEY);

  const locationSamu = async function (
    latitude: number,
    longitude: number,
    radius: number,
  ): Promise<LatLng> {
    const apiStringNearBy = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=samu%20servico%20de%20emergencia&location=${latitude}%2C${longitude}&radius=${radius}&key=${apiKey}`;
    const configNearby = {
      method: 'get',
      url: apiStringNearBy,
      headers: {},
    };
    const response: MapsApiResponse = await axios(configNearby);
    return response.data.results[0].geometry.location;
  };

  const directionsSamu = async function (
    latitudeOrigin: number,
    longitudeOrigin: number,
    latitudeDestination: number,
    longitudeDestination: number,
  ): Promise<any> {
    const apiStringDirections = `https://maps.googleapis.com/maps/api/directions/json?destination=${latitudeDestination},${longitudeDestination}&travelmode=driving&origin=${latitudeOrigin},${longitudeOrigin}&key=${apiKey}`;
    const configDirections = {
      method: 'get',
      url: apiStringDirections,
      headers: {},
    };

    const response = await axios(configDirections);
    return {
      distance: response.data.routes[0].legs[0].distance.text,
      time: response.data.routes[0].legs[0].duration.text,
    };
  };

  try {
    const location = await locationSamu(latitude, longitude, radius);
    const distanceTime = await directionsSamu(
      latitude,
      longitude,
      location.lat,
      location.lng,
    );
    console.log(distanceTime);

    return location;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};
