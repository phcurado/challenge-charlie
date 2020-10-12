import BaseModel from '@/domain/base/BaseModel';

interface MainParams {
    temp: number;
    pressure: number;
    humidity: number;
}

interface WindParams {
    speed: number;
    deg: number;
}

interface WeatherParams {
    icon: string;
}

interface OpenWeatherParams {
    main: MainParams;
    wind: WindParams;
    weather: Array<WeatherParams>;
}

class OpenWeather extends BaseModel implements OpenWeatherParams {
    main: MainParams;
    wind: WindParams;
    weather: Array<WeatherParams>;

    constructor(
        data: OpenWeatherParams = {
            main: {
                temp: 0,
                pressure: 0,
                humidity: 0,
            },
            wind: {
                speed: 0,
                deg: 0,
            },
            weather: [
                {
                    icon: '01d',
                },
            ],
        }
    ) {
        super();
        this.main = data.main;
        this.wind = data.wind;
        this.weather = data.weather;
    }

    get icon() {
        return this.weather && this.weather[0].icon
            ? parseInt(this.weather[0].icon.split('d')[0]).toString()
            : '1';
    }

    static fromData(data: OpenWeatherParams): OpenWeather {
        return new OpenWeather(data);
    }
}

export default OpenWeather;
export { OpenWeatherParams };
