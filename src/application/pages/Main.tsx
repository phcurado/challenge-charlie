import React, { useEffect, useState } from 'react';

// Components
import Card from '@/application/components/Card';
import { Row, Col } from '@/application/components/grid';
import WeatherCityInput from '@/application/components/WeatherCityInput';
import WeatherCard from '@/application/components/WeatherCard';

// Services
import { openCageService, openWeatherService } from '@/infrastructure/services';
import { geolocationService } from '@/domain/services';

// Models
import Geolocation from '@/domain/models/Geolocation';
import OpenWeather from '@/domain/models/OpenWeather';
import TemperatureType from '@/domain/models/enums/TemperatureType';

/**
 * Main page
 */
const main = () => {
    const [geolocation, setGeolocation] = useState(new Geolocation());
    const [locationName, setLocationName] = useState('');
    const [weatherInfo, setWeatherInfo] = useState(new OpenWeather());
    const [temperatureType, setTemperatureType] = useState(TemperatureType.CELSIUS);
    const [weatherTomorrow, setWeatherTomorrow] = useState(new OpenWeather());

    useEffect(() => {
        fetchLatLong();
    }, []);

    useEffect(() => {
        fetchLocationName();
    }, [geolocation.latitude, geolocation.longitude]);

    useEffect(() => {
        fetchWeather();
    }, [locationName]);

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
        if (locationName) {
            const info = await openWeatherService.getWeather(locationName);
            if (info) {
                setWeatherInfo(info);
            }

            const forecast = await openWeatherService.getForecast(locationName);
        }
    };

    return (
        <Row>
            <Col center>
                <Card width="500px">
                    <Row>
                        <Col>
                            <WeatherCityInput
                                defaultValue={locationName}
                                backgroundColor="white"
                                icon="44"
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
                </Card>
            </Col>
        </Row>
    );
};

export default main;
