import TemperatureType from '@/domain/models/enums/TemperatureType';

const kelvinToCelsius = (kelvinTemp: number) => {
    return kelvinTemp - 273;
};

const celsiusToFahrenheit = (celsiusTemp: number) => {
    return (celsiusTemp * 9) / 5 + 32;
};

const fahrenheitToCelsius = (fahrenheitTemp: number) => {
    return ((fahrenheitTemp - 32) * 5) / 9;
};

const tempTypeMap = new Map<TemperatureType, string>();
tempTypeMap.set(TemperatureType.CELSIUS, '°C');
tempTypeMap.set(TemperatureType.FAHRENHEIT, '°F');
tempTypeMap.set(TemperatureType.KELVIN, 'K');

const getTemperatureLabel = (tempType: TemperatureType) => {
    return tempTypeMap.get(tempType);
};

const getTemperatureValue = (value: number, from: TemperatureType, to: TemperatureType): number => {
    if (from == to) {
        return value;
    }
    if (from == TemperatureType.KELVIN) {
        return getTemperatureValue(kelvinToCelsius(value), TemperatureType.CELSIUS, to);
    }

    if (from == TemperatureType.CELSIUS) {
        return celsiusToFahrenheit(value);
    }
    return fahrenheitToCelsius(value);
};

export { getTemperatureLabel, getTemperatureValue, kelvinToCelsius };
