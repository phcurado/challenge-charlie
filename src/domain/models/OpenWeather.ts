import BaseModel from '@/domain/base/BaseModel';

interface WindParams {
    speed: number;
    deg: number;
}

interface MainParams {
    temp: number;
    pressure: number;
    humidity: number;
}

interface OpenWeatherParams {
    main: MainParams;
    wind: WindParams;
}

class OpenWeather extends BaseModel implements OpenWeatherParams {
    main: MainParams;
    wind: WindParams;

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
        }
    ) {
        super();
        this.main = data.main;
        this.wind = data.wind;
    }

    static fromData(data: OpenWeatherParams): OpenWeather {
        return new OpenWeather(data);
    }
}

export default OpenWeather;
export { OpenWeatherParams };
