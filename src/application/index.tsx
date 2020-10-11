import React, { useEffect, useState } from 'react';
import { bingService } from '@/infrastructure/services';

const app = () => {
    const [backgroundImage, setbackgroundImage] = useState('');

    const fetchBackgroundImage = async () => {
        const imageUrl = await bingService.getImageUrl();
        setbackgroundImage(imageUrl);
    };

    useEffect(() => {
        fetchBackgroundImage();
    }, []);

    return (
        <>
            <img src={backgroundImage}></img>
            <h1>Hello World</h1>
        </>
    );
};

export default app;
