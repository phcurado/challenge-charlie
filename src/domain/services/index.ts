import GeolocationService from './GeolocationService';
import WeatherService from './WeatherService';
import { openWeatherService } from '@/infrastructure/services';

const geolocationService = new GeolocationService();
const weatherService = new WeatherService(openWeatherService);

export { geolocationService, weatherService };
