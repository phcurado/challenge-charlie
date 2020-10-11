import React, { useEffect, useState } from 'react';
import BackgroundImage from '@/application/components/BackgroundImage';
import { bingService } from '@/infrastructure/services';

const main = () => {
    const [backgroundImage, setbackgroundImage] = useState('');

    const fetchBackgroundImage = async () => {
        const imageUrl = await bingService.getImageUrl();
        setbackgroundImage(imageUrl);
    };

    useEffect(() => {
        fetchBackgroundImage();
    }, []);

    return (
        <BackgroundImage url={backgroundImage}>
            <h1>Hello World</h1>
        </BackgroundImage>
    );
};

export default main;
