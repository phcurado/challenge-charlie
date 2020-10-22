import OpenWeather from '@/domain/models/weather/Weather';
import Forecast from '@/domain/models/weather/Forecast';

interface IOpenWeatherService {
    getWeather(locationName: string): Promise<OpenWeather | null>;
    getForecast(locationName: string, hours: number): Promise<Forecast>;
}

export default IOpenWeatherService;
