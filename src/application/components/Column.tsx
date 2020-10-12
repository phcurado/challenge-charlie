import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface Props {
    children: ReactNode;
    center?: boolean;
}
const Column = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 5px;

    ${({ center }: Props) =>
        center &&
        css`
            align-items: center;
        `}
`;

const column = ({ children, center }: Props) => {
    return <Column center={center}>{children}</Column>;
};

export default column;
