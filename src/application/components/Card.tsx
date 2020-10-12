import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
    width: string;
    children: ReactNode;
}
const Card = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: ${({ width }: Props) => width};
`;

const CardInner = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const card = ({ width, children }: Props) => {
    return (
        <Card width={width}>
            <CardInner>{children}</CardInner>
        </Card>
    );
};

export default card;
