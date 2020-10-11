import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface InputProps {
    color?: string;
}
interface Props extends InputProps {
    children: ReactNode;
}

const Row = styled.div`
    display: flex;
    flex-direction: row;
    background-color: ${({ color }: InputProps) => color};
`;

const row = ({ color, children }: Props) => {
    return <Row color={color}>{children}</Row>;
};

export default row;
