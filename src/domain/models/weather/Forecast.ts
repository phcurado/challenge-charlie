import BaseModel from '@/domain/base/BaseModel';
import { heatColor } from '@/domain/helper/heatColor';
import {
    getTemperatureLabel,
    getTemperatureValue,
    kelvinToCelsius,
} from '@/domain/utils/temperatureUtils';
import TemperatureType from '../enums/TemperatureType';
import { WeatherParams } from './Weather';

interface TempParams {
    day: number;
}

interface ConfigParams {
    temperatureType: TemperatureType;
}

interface IForecastParams {
    temp: TempParams;
    weather: Array<WeatherParams>;
    config?: ConfigParams;
}

class Forecast extends BaseModel implements IForecastParams {
    temp: TempParams;
    weather: Array<WeatherParams>;
    config: ConfigParams;

    constructor(
        data: IForecastParams = {
            temp: {
                day: 0,
            },
            weather: [],
        }
    ) {
        super();
        this.temp = data.temp;
        this.weather = data.weather;
        this.config = { temperatureType: TemperatureType.KELVIN };
    }

    get temperature() {
        return this.temp.day;
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
     * Format the Weather icon to this application local icon
     */
    get icon() {
        return this.weather && this.weather[0].icon
            ? parseInt(this.weather[0].icon.split('d')[0]).toString()
            : '1';
    }

    /**
     * Heat Color RGBA for temperature
     */
    get heatColor(): string {
        return heatColor(kelvinToCelsius(this.temperature));
    }

    static fromData(data: IForecastParams): Forecast {
        return new Forecast(data);
    }
}

export default Forecast;
export { IForecastParams };
