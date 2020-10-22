import Forecast from '@/domain/models/weather/Forecast';
import IOpenWeatherService from '../interfaces/IOpenWeatherService';

/**
 * Service for the Domain Weather
 */
class WeatherService {
    private openWeatherService: IOpenWeatherService;

    constructor(openWeatherService: IOpenWeatherService) {
        this.openWeatherService = openWeatherService;
    }

    async getForecast(locationName: string, daysAfter: number): Promise<Forecast | null> {
        try {
            const forecast = await this.openWeatherService.getForecast(locationName, 8 * daysAfter);
            forecast.list =
                forecast?.list != null
                    ? forecast.list
                          .filter((weather) => weather.dt_txt.getHours() === 0)
                          .slice(0, daysAfter - 1)
                    : [];
            return forecast;
        } catch (err) {
            return null;
        }
    }
}

export default WeatherService;
