import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import WeatherIcon from '@/application/components/icon/WeatherIcon';

interface DivProps {
    backgroundColor?: string;
    height?: string | number;
}
interface Props extends InputHTMLAttributes<HTMLInputElement>, DivProps {
    backgroundColor?: string;
    height?: string | number;
    icon?: string;
}

const Input = styled.input`
    border: none;
    background-color: transparent;
    width: 100%;
    margin-left: 15px;
    color: ${({ color }: Props) => color};
    font-size: 21pt;
    font-weight: bold;
    &:focus {
        outline: none;
    }
`;

const Div = styled.div`
    display: flex;
    position: relative;
    padding: 15px;
    background-color: ${({ backgroundColor }: DivProps) => backgroundColor};
    height: ${({ height }: DivProps) => height};
`;

const weatherCityInput = ({ color, icon, backgroundColor, height, ...rest }: Props) => {
    return (
        <Div backgroundColor={backgroundColor} height={height}>
            {icon ? <WeatherIcon fill={color} name={icon} width={height} height={height} /> : null}
            <Input color={color} {...rest}></Input>
        </Div>
    );
};

export default weatherCityInput;
