import OpenWeather from '@/domain/models/weather/Weather';
import Forecast from '@/domain/models/weather/Forecast';
import IOpenWeatherService from '@/domain/interfaces/IOpenWeatherService';

/**
 * Mock Service for the OpenWeather API
 */
class OpenWeatherServiceMock implements IOpenWeatherService {
    static API_KEY = process.env.OPEN_WEATHER_API_KEY;

    async getWeather(locationName: string): Promise<OpenWeather | null> {
        return new Promise((resolve) => {
            return resolve(
                OpenWeather.fromData({
                    main: {
                        temp: 270,
                        pressure: 9000,
                        humidity: 10,
                    },
                    wind: {
                        speed: 2,
                        deg: 40,
                    },
                    weather: [
                        {
                            description: 'ensolarado',
                            icon: '01d',
                        },
                    ],
                    dt_txt: new Date(),
                })
            );
        });
    }

    async getForecast(locationName: string, hours: number = 5): Promise<Forecast> {
        return new Promise((resolve) => {
            const dateWithZeroHours = new Date();
            dateWithZeroHours.setHours(0, 0, 0, 0);

            const dateWithNonZeroHours = new Date();
            dateWithNonZeroHours.setHours(4, 5, 5, 5);

            return resolve(
                Forecast.fromData({
                    list: [
                        {
                            main: {
                                temp: 270,
                                pressure: 9000,
                                humidity: 10,
                            },
                            wind: {
                                speed: 2,
                                deg: 40,
                            },
                            weather: [
                                {
                                    description: 'ensolarado',
                                    icon: '01d',
                                },
                            ],
                            dt_txt: dateWithZeroHours,
                        },
                        {
                            main: {
                                temp: 300,
                                pressure: 1000,
                                humidity: 20,
                            },
                            wind: {
                                speed: 2,
                                deg: 40,
                            },
                            weather: [
                                {
                                    description: 'ensolarado',
                                    icon: '01d',
                                },
                            ],
                            dt_txt: dateWithNonZeroHours,
                        },
                    ],
                })
            );
        });
    }
}

export default OpenWeatherServiceMock;
