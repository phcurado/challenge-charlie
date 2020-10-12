import React, { useEffect, useState } from 'react';

// Components
import BackgroundImage from '@/application/components/BackgroundImage';
import Card from '@/application/components/Card';
import Row from '@/application/components/Row';
import Col from '@/application/components/Column';
import WeatherCityInput from '@/application/components/WeatherCityInput';
import WeatherIcon from '@/application/components/icon/WeatherIcon';

// Services
import { bingService, openCageService, openWeatherService } from '@/infrastructure/services';
import { geolocationService } from '@/domain/services';

// Models
import Geolocation from '@/domain/models/Geolocation';
import OpenWeather from '@/domain/models/OpenWeather';

/**
 * Main page
 */
const main = () => {
    const [backgroundImage, setBackgroundImage] = useState('');
    const [geolocation, setGeolocation] = useState(new Geolocation());
    const [locationName, setLocationName] = useState('');
    const [weatherInfo, setWeatherInfo] = useState(new OpenWeather());

    useEffect(() => {
        fetchBackgroundImage();
    }, []);

    useEffect(() => {
        fetchLatLong();
    }, []);

    useEffect(() => {
        fetchLocationName();
    }, []);

    useEffect(() => {
        fetchWeather();
    }, [locationName]);

    const fetchBackgroundImage = async () => {
        const imageUrl = await bingService.getImageUrl();
        setBackgroundImage(imageUrl);
    };

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
            setWeatherInfo(info);
        }
    };

    return (
        <BackgroundImage url={backgroundImage}>
            <Row>
                <Col center>
                    <Card width="700px">
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
                                <WeatherIcon
                                    fill="white"
                                    name={weatherInfo.icon}
                                    width="200px"
                                    height="200px"
                                />
                            </Col>
                            <Col>
                                <p>Hoje</p>
                                <p>{weatherInfo.main.temp}</p>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </BackgroundImage>
    );
};

export default main;
