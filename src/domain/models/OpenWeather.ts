import BaseModel from '@/domain/base/BaseModel';
import TemperatureType from '@/domain/models/enums/TemperatureType';
import {
    getTemperatureLabel,
    getTemperatureValue,
    kelvinToCelsius,
} from '@/domain/utils/temperatureUtils';
import { msToKMh } from '@/domain/utils/speedUtils';

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

interface OpenWeatherParams {
    main: MainParams;
    wind: WindParams;
    weather: Array<WeatherParams>;
}

class OpenWeather extends BaseModel implements OpenWeatherParams {
    main: MainParams;
    wind: WindParams;
    weather: Array<WeatherParams>;
    config: ConfigParams;

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
                    description: 'ensolarado',
                    icon: '01d',
                },
            ],
        }
    ) {
        super();
        this.main = data.main;
        this.wind = data.wind;
        this.weather = data.weather;
        this.config = { temperatureType: TemperatureType.KELVIN };
    }

    /**
     * Format the OpenWeather icon to this application local icon
     */
    get icon() {
        return this.weather && this.weather[0].icon
            ? parseInt(this.weather[0].icon.split('d')[0]).toString()
            : '1';
    }

    /**
     * Get the Temperature from OpenWeather
     */
    get temperature(): number | null {
        return this.main ? this.main.temp : null;
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
        const speed = msToKMh(this.wind.speed);
        return `${speed.toString()}Km/h`;
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
     * Calcula a cor RGBA para as diferentes temperaturas
     */
    get heatColor(): string {
        const BOT_TEMP = -60;
        const MIN_TEMP = 15;
        const MAX_TEMP = 35;
        const TOP_TEMP = 60;
        const MIN_RANGE = 15;

        if (!this.temperature) return 'white';

        const temperature = kelvinToCelsius(this.temperature);

        let colorBind = 233;
        let a = 1;

        if (temperature <= MIN_TEMP) {
            a = (MIN_TEMP - temperature + MIN_RANGE) / (MIN_TEMP - BOT_TEMP);
            return `rgba(0, 0, ${colorBind}, ${a})`;
        } else if (temperature >= MAX_TEMP) {
            a = (temperature + MIN_RANGE) / (TOP_TEMP + MAX_TEMP);
            return `rgba(${colorBind}, 0, 0, ${a})`;
        }

        a = temperature / MAX_TEMP;
        return `rgba(${colorBind}, ${colorBind}, 0, ${a})`;
    }

    static fromData(data: OpenWeatherParams): OpenWeather {
        return new OpenWeather(data);
    }
}

export default OpenWeather;
export { OpenWeatherParams };
