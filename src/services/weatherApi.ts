import { Task } from '../types';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getWeatherData(city: string = 'London') {
  // Return mock data if no API key is configured
  if (!API_KEY) {
    console.info('Using mock weather data. Configure VITE_OPENWEATHER_API_KEY in .env for real weather data.');
    return {
      temp: 20,
      condition: 'Clear',
      isMock: true
    };
  }

  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Weather API error');
    }

    const data = await response.json();
    
    return {
      temp: Math.round(data.main.temp),
      condition: data.weather[0].main,
      isMock: false
    };
  } catch (error) {
    console.info('Falling back to mock weather data');
    return {
      temp: 20,
      condition: 'Clear',
      isMock: true
    };
  }
}