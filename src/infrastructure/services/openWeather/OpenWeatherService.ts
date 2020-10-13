import { AxiosInstance, AxiosResponse } from 'axios';
import route from './route';
import OpenWeather, { IWeatherParams } from '@/domain/models/weather/Weather';
import ForecastList, { IForecastListParams } from '@/domain/models/weather/ForecastList';

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
            .then((response: AxiosResponse<IWeatherParams>) => {
                return OpenWeather.fromData(response.data);
            })
            .catch(() => {
                return null;
            });
    }

    async getForecast(locationName: string): Promise<ForecastList | null> {
        return this.http
            .get(`${route.BASE}${route.FORECAST}`, {
                params: {
                    q: `${locationName}`,
                    lang: 'pt_br',
                    cnt: 3,
                    APPID: OpenWeatherService.API_KEY,
                },
            })
            .then((response: AxiosResponse<IForecastListParams>) => {
                return ForecastList.fromData(response.data);
            })
            .catch(() => {
                return null;
            });
    }
}

export default OpenWeatherService;
