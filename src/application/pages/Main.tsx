import React, { useEffect, useState } from 'react';
import BackgroundImage from '@/application/components/BackgroundImage';
import { bingService, openCageService } from '@/infrastructure/services';
import { geolocationService } from '@/domain/services';
import Geolocation from '@/domain/models/Geolocation';

/**
 * Main page
 */
const main = () => {
    const [backgroundImage, setBackgroundImage] = useState('');
    const [geolocation, setGeolocation] = useState(new Geolocation());

    const fetchBackgroundImage = async () => {
        const imageUrl = await bingService.getImageUrl();
        setBackgroundImage(imageUrl);
    };

    const fetchLatLong = async () => {
        const dummyGeo = new Geolocation();
        geolocationService.setLocation(dummyGeo);
        setGeolocation(dummyGeo);
        console.log(geolocation);
    };

    const fetchLocationName = async () => {
        if (geolocation.latitude && geolocation.longitude) {
            const name = await openCageService.getLocationName(
                geolocation.latitude,
                geolocation.longitude
            );
        }
    };

    useEffect(() => {
        fetchBackgroundImage();
        fetchLatLong();
        fetchLocationName();
    }, []);

    return (
        <BackgroundImage url={backgroundImage}>
            <h1>Hello World</h1>
        </BackgroundImage>
    );
};

export default main;
