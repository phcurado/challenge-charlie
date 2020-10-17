import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface Props {
    children: ReactNode;
    center?: boolean;
    hiddenSm?: string;
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
        `};
    ${({ hiddenSm }: Props) =>
        hiddenSm &&
        css`
            @media (max-width: ${hiddenSm}) {
                display: none;
            }
        `};
`;

const column = ({ children, ...rest }: Props) => {
    return <Column {...rest}>{children}</Column>;
};

export default column;
