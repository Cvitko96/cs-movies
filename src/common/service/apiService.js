import { movieDBapiToken, movieDBapiUrl } from '../constants/constants';


export const fetchData = async (path, method = 'GET', body = null) => {
  try {
    const options = {
      method,
      headers: {
        'accept': 'application/json',
        Authorization: `Bearer ${movieDBapiToken}`
      },
    };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${movieDBapiUrl}/${path}`, options);

    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};
