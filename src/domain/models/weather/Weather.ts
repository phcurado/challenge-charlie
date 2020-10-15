import BaseModel from '@/domain/base/BaseModel';
import TemperatureType from '@/domain/models/enums/TemperatureType';
import {
    getTemperatureLabel,
    getTemperatureValue,
    kelvinToCelsius,
} from '@/domain/utils/temperatureUtils';
import { msToKMh } from '@/domain/utils/speedUtils';
import { heatColor } from '@/domain/helper/heatColor';
import { windDirection } from '@/domain/helper/windDirection';

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
    description: string;
}

interface ConfigParams {
    temperatureType: TemperatureType;
}

interface IWeatherParams {
    main: MainParams;
    wind: WindParams;
    weather: Array<WeatherParams>;
    dt_txt: Date;
}

class Weather extends BaseModel implements IWeatherParams {
    main: MainParams;
    wind: WindParams;
    weather: Array<WeatherParams>;
    dt_txt: Date;
    config: ConfigParams;

    constructor(
        data: IWeatherParams = {
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
                    description: 'ensolarado',
                    icon: '01d',
                },
            ],
            dt_txt: new Date(),
        }
    ) {
        super();
        this.main = data.main;
        this.wind = data.wind;
        this.weather = data.weather;
        this.dt_txt = new Date(data.dt_txt);
        this.config = { temperatureType: TemperatureType.KELVIN };
    }

    /**
     * Format the Weather icon to this application local icon
     */
    get icon() {
        return this.weather && this.weather[0].icon ? this.weather[0].icon : '1d';
    }

    /**
     * Get the Temperature from Weather
     */
    get temperature(): number {
        return this.main.temp;
    }

    /**
     * Format the Temperature to °C or °F
     */
    getTemperatureFormatted(tempType: TemperatureType): string {
        if (this.temperature) {
            return `${getTemperatureValue(this.temperature, this.config.temperatureType, tempType)
                .toPrecision(2)
                .toString()}${getTemperatureLabel(tempType)}`;
        }

        return '-';
    }

    /**
     * Format wind
     */
    getDescription(): string {
        return this.weather[0].description;
    }

    /**
     * Format wind
     */
    getWindFormatted(): string {
        const speed = msToKMh(this.wind.speed).toFixed(2);
        return `${this.windDirection} ${speed.toString()}Km/h`;
    }

    /**
     * Format Humidity a humidade
     */
    getHumidityFormatted(): string {
        return `${this.main.humidity}%`;
    }

    /**
     * Format Pressure a humidade
     */
    getPressureFormatted(): string {
        return `${this.main.pressure}hPA`;
    }

    /**
     * Heat Color RGBA for temperature
     */
    get heatColor(): string {
        return heatColor(kelvinToCelsius(this.temperature));
    }

    /**
     * Wind Direction
     */
    get windDirection(): string {
        return windDirection(this.wind.deg);
    }

    static fromData(data: IWeatherParams): Weather {
        return new Weather(data);
    }
}

export default Weather;
export { IWeatherParams, WeatherParams };
