import axios from 'axios';

export const closestSamuLocation = async (
  latitude: number,
  longitude: number,
  radius: number,
): Promise<{lat: number; lng: number}> => {
  const apiKey = String(process.env.API_KEY);
  const config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Cgeometry&input=samu%20servico%20de%20emergencia&inputtype=textquery&locationbias=circle%3A${radius}%${latitude}%2C${longitude}&key=${apiKey}`,
    headers: {},
  };
  await axios(config)
    .then((response: any) => {
      console.log(response.data);
    })
    .catch((error: any) => {
      console.log(error);
    });

  return {
    lat: latitude,
    lng: longitude,
  };
};
