import httpInstance from '@/infrastructure/http';
import BingService from './bing/BingService';
import OpenCageService from './openCage/OpenCageService';
import OpenWeatherService from './openWeather/OpenWeatherService';

const bingService = new BingService(httpInstance);
const openCageService = new OpenCageService(httpInstance);
const openWeatherService = new OpenWeatherService(httpInstance);

export { bingService, openCageService, openWeatherService };
