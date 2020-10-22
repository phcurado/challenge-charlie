import TemperatureType from '@/domain/models/enums/TemperatureType';
import Weather from '@/domain/models/weather/Weather';

const weather = new Weather({
    main: {
        temp: 300,
        pressure: 9000,
        humidity: 30,
    },
    wind: {
        speed: 10,
        deg: 180,
    },
    weather: [
        {
            description: 'sol',
            icon: '01d',
        },
        {
            description: 'ensolarado',
            icon: '02d',
        },
    ],
    dt_txt: new Date(),
});

test('Should show the correct description', () => {
    expect(weather.getDescription()).toBe('sol');
});

test('Should show the correct icon', () => {
    expect(weather.icon).toBe('01d');
});

test('Should show the correct wind formatted', () => {
    expect(weather.getWindFormatted()).toBe('S 36.00Km/h');
});

test('Should show the correct humidity formatted', () => {
    expect(weather.getHumidityFormatted()).toBe('30%');
});

test('Should show the correct temperature formatted', () => {
    expect(weather.getTemperatureFormatted(TemperatureType.CELSIUS)).toBe('27°C');
});
