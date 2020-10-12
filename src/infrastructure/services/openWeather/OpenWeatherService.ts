import { AxiosInstance, AxiosResponse } from 'axios';
import route from './route';
import OpenWeather, { OpenWeatherParams } from '@/domain/models/OpenWeather';

/**
 * Service for the OpenWeather API
 */
class OpenWeatherService {
    static API_KEY = '7ba73e0eb8efe773ed08bfd0627f07b8';
    constructor(private http: AxiosInstance) {}

    async getWeather(locationName: string): Promise<OpenWeather> {
        return this.http
            .get(`${route.BASE}`, {
                params: {
                    q: `${locationName}`,
                    APPID: OpenWeatherService.API_KEY,
                },
            })
            .then((response: AxiosResponse<OpenWeatherParams>) => {
                return OpenWeather.fromData(response.data);
            });
    }
}

export default OpenWeatherService;