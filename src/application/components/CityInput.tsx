import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
    children: ReactNode;
}
const Input = styled.div`
    display: flex;
    flex-direction: row;
`;

const row = (props: Props) => {
    return <input {...props}></input>;
};

export default row;
