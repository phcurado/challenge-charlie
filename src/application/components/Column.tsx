import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
    children: ReactNode;
}
const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

const column = ({ children }: Props) => {
    return <Column>{children}</Column>;
};

export default column;
