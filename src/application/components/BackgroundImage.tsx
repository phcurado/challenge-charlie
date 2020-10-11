import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
    url: string;
    children: ReactNode;
}
const BackgroundImage = styled.div`
    width: 100%;
    height: 100vh;
    background-repeat: no-repeat;
    background-size: auto;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
        url(${({ url }: Props) => url});
`;

const backgroundImage = ({ url, children }: Props) => {
    return <BackgroundImage url={url}>{children}</BackgroundImage>;
};

export default backgroundImage;
