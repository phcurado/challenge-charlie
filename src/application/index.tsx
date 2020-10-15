import React, { useLayoutEffect, useState } from 'react';

// Services
import { bingService } from '@/infrastructure/services';

// Components
import BackgroundImage from '@/application/components/BackgroundImage';
import ResetStyle from './styles/Reset';
import Main from './pages/MainPage';

const app = () => {
    const [backgroundImage, setBackgroundImage] = useState('');
    useLayoutEffect(() => {
        fetchBackgroundImage();
    }, []);

    const fetchBackgroundImage = async () => {
        const imageUrl = await bingService.getImageUrl();
        setBackgroundImage(imageUrl);
    };

    return (
        <>
            <ResetStyle />
            <BackgroundImage url={backgroundImage}>
                <Main />
            </BackgroundImage>
        </>
    );
};

export default app;
