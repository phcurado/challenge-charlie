import React, { useEffect, useState } from 'react';

// Components
import BackgroundImage from '@/application/components/BackgroundImage';
import WeatherIcon from '@/application/components/icon/WeatherIcon';
import Card from '@/application/components/Card';
import Row from '@/application/components/Row';
import Col from '@/application/components/Column';

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
    }, [locationName]);

    useEffect(() => {
        fetchLocationName();
    }, [geolocation]);

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
            <Card width="100%">
                <Row>
                    <Col>
                        <WeatherIcon name="44" width="50" />
                    </Col>
                    <Col>
                        <input
                            defaultValue={locationName}
                            onChange={(event) => setLocationName(event.target.value)}
                        />
                    </Col>
                </Row>
                <p>{weatherInfo.main.temp}</p>
                <div style={{ height: '200px', width: '500px' }} className="size"></div>
            </Card>
        </BackgroundImage>
    );
};

export default main;
