import { AxiosInstance, AxiosResponse } from 'axios';
import route from './route';
import OpenWeather, { OpenWeatherParams } from '@/domain/models/OpenWeather';

/**
 * Service for the OpenWeather API
 */
class OpenWeatherService {
    static API_KEY = process.env.OPEN_WEATHER_API_KEY;
    constructor(private http: AxiosInstance) {}

    async getWeather(locationName: string): Promise<OpenWeather | null> {
        return this.http
            .get(`${route.BASE}${route.WEATHER}`, {
                params: {
                    q: `${locationName}`,
                    lang: 'pt_br',
                    APPID: OpenWeatherService.API_KEY,
                },
            })
            .then((response: AxiosResponse<OpenWeatherParams>) => {
                return OpenWeather.fromData(response.data);
            })
            .catch(() => {
                return null;
            });
    }

    async getForecast(locationName: string): Promise<OpenWeather | null> {
        return this.http
            .get(`${route.BASE}${route.FORECAST}`, {
                params: {
                    q: `${locationName}`,
                    lang: 'pt_br',
                    cnt: 3,
                    APPID: OpenWeatherService.API_KEY,
                },
            })
            .then((response: AxiosResponse<OpenWeatherParams>) => {
                return OpenWeather.fromData(response.data);
            })
            .catch(() => {
                return null;
            });
    }
}

export default OpenWeatherService;
