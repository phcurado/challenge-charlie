import Forecast from '@/domain/models/weather/Forecast';
import { openWeatherService } from '@/infrastructure/services';

/**
 * Service for the Domain Weather
 */
class WeatherService {
    async getForecast(locationName: string, daysAfter: number): Promise<Forecast | null> {
        try {
            const forecast = await openWeatherService.getForecast(locationName, 8 * daysAfter);
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
