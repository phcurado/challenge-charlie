import { AxiosInstance, AxiosResponse } from 'axios';
import route from './route';
import OpenWeather, { IWeatherParams } from '@/domain/models/weather/Weather';
import Forecast, { IForecastParams } from '@/domain/models/weather/Forecast';
import IOpenWeatherService from '@/domain/interfaces/IOpenWeatherService';

/**
 * Service for the OpenWeather API
 */
class OpenWeatherService implements IOpenWeatherService {
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
            .catch((err) => {
                return null;
            });
    }

    async getForecast(locationName: string, hours: number = 5): Promise<Forecast> {
        return this.http
            .get(`${route.BASE}${route.FORECAST}`, {
                params: {
                    q: `${locationName}`,
                    lang: 'pt_br',
                    cnt: hours,
                    APPID: OpenWeatherService.API_KEY,
                },
            })
            .then((response: AxiosResponse<IForecastParams>) => {
                return Forecast.fromData(response.data);
            })
            .catch((err) => {
                throw err;
            });
    }
}

export default OpenWeatherService;
