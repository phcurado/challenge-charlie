import React from 'react';
import { render, screen } from '@testing-library/react';

import BackgroundImage from '@/application/components/BackgroundImage';

describe('<BackgroundImage />', () => {
    test('should background image component', () => {
        render(
            <BackgroundImage url="@/application/assets/images/background.jpeg"></BackgroundImage>
        );
    });
});
