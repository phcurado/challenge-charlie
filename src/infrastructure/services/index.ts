import httpInstance from '@/infrastructure/http';
import BingService from './bing/BingService';

const bingService = new BingService(httpInstance);

export { bingService };
