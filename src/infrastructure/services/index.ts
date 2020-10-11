import httpInstance from '@/infrastructure/http';
import BingService from './bing/BingService';
import OpenCageService from './openCage/OpenCageService';

const bingService = new BingService(httpInstance);
const openCageService = new OpenCageService(httpInstance);

export { bingService, openCageService };
