import React, { useEffect, useState } from 'react';

// Components
import Card from '@/application/components/Card';
import { Row, Col } from '@/application/components/grid';
import WeatherCityInput from '@/application/components/WeatherCityInput';
import WeatherCard from '@/application/components/WeatherCard';

// Services
import { openCageService, openWeatherService } from '@/infrastructure/services';
import { weatherService } from '@/domain/services';
import { geolocationService } from '@/domain/services';

// Models
import Geolocation from '@/domain/models/Geolocation';
import Weather from '@/domain/models/weather/Weather';
import Forecast from '@/domain/models/weather/Forecast';
import TemperatureType from '@/domain/models/enums/TemperatureType';
import useDebounce from '@/application/hooks/useDebounce';

/**
 * Main page
 */
const mainPage = () => {
    const [geolocation, setGeolocation] = useState(new Geolocation());
    const [locationName, setLocationName] = useState('');

    const [weatherInfo, setWeatherInfo] = useState(new Weather());
    const [temperatureType, setTemperatureType] = useState(TemperatureType.CELSIUS);
    const [forecastInfo, setForecastInfo] = useState(new Forecast());

    const debouncedLocationName = useDebounce(locationName, 500);

    useEffect(() => {
        fetchLatLong();
    }, []);

    useEffect(() => {
        fetchLocationName();
    }, [geolocation.latitude, geolocation.longitude]);

    useEffect(() => {
        fetchWeather();
    }, [debouncedLocationName]);

    const fetchLatLong = async () => {
        const dummyGeo = new Geolocation();
        geolocationService.setLocation(dummyGeo);
        setGeolocation(dummyGeo);
    };

    const fetchLocationName = async () => {
        if (geolocation.latitude && geolocation.longitude) {
            const name = await openCageService.getLocationName(
                geolocation.latitude,
                geolocation.longitude
            );
            setLocationName(name);
        }
    };

    const fetchWeather = async () => {
        if (debouncedLocationName) {
            const info = await openWeatherService.getWeather(debouncedLocationName);
            if (info) {
                setWeatherInfo(info);
            }

            const forecast = await weatherService.getForecast(debouncedLocationName, 3);
            if (forecast) {
                setForecastInfo(forecast);
            }
        }
    };

    const renderForecasts = () => {
        return forecastInfo.list.map((forecast, i) => {
            return (
                <Row key={i}>
                    <Col>
                        <WeatherCard
                            dayLabel={i === 0 ? 'AMANHÃ' : 'DEPOIS DE AMANHÃ'}
                            backgroundColor={forecast.heatColor}
                            color="white"
                            temperature={forecast.getTemperatureFormatted(temperatureType)}
                            onClickTemperature={() =>
                                setTemperatureType(
                                    temperatureType == TemperatureType.CELSIUS
                                        ? TemperatureType.FAHRENHEIT
                                        : TemperatureType.CELSIUS
                                )
                            }
                        />
                    </Col>
                </Row>
            );
        });
    };

    return (
        <Row>
            <Col center>
                <Card width="600px">
                    <Row>
                        <Col>
                            <WeatherCityInput
                                defaultValue={locationName}
                                backgroundColor="white"
                                icon="compass"
                                height="50px"
                                color={'#7d7d7d'}
                                onChange={(event) => setLocationName(event.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <WeatherCard
                                dayLabel="HOJE"
                                backgroundColor={weatherInfo.heatColor}
                                color="white"
                                icon={weatherInfo.icon}
                                temperature={weatherInfo.getTemperatureFormatted(temperatureType)}
                                onClickTemperature={() =>
                                    setTemperatureType(
                                        temperatureType == TemperatureType.CELSIUS
                                            ? TemperatureType.FAHRENHEIT
                                            : TemperatureType.CELSIUS
                                    )
                                }
                                extraInfo={{
                                    description: weatherInfo.getDescription(),
                                    wind: weatherInfo.getWindFormatted(),
                                    humidity: weatherInfo.getHumidityFormatted(),
                                    pressure: weatherInfo.getPressureFormatted(),
                                }}
                            />
                        </Col>
                    </Row>
                    {renderForecasts()}
                </Card>
            </Col>
        </Row>
    );
};

export default mainPage;
