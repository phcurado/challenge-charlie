import TemperatureType from '@/domain/models/enums/TemperatureType';
import WeatherService from '@/domain/services/WeatherService';
import OpenWeatherServiceMock from '@/__mocks__/OpenWeatherServiceMock';

const weatherService = new WeatherService(new OpenWeatherServiceMock());

test('Should get Forecasts and validate the temperature', async () => {
    const forecasts = await weatherService.getForecast('São Paulo', 10);

    expect(forecasts?.list).not.toBeNull();

    const firstForeCast = forecasts?.list[0];
    const temperature = firstForeCast?.getTemperatureFormatted(TemperatureType.CELSIUS);

    expect(temperature).toBe('-3.0°C');
});

test('Should get Forecasts and validate the pressure', async () => {
    const forecasts = await weatherService.getForecast('São Paulo', 10);

    expect(forecasts?.list).not.toBeNull();

    const firstForeCast = forecasts?.list[0];
    const pressure = firstForeCast?.getPressureFormatted();

    expect(pressure).toBe('9000hPA');
});
