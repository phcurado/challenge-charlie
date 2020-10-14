import React, { HTMLAttributes, InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import WeatherIcon from '@/application/components/icon/WeatherIcon';
import { Row, Col } from '@/application/components/grid';

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
    color?: string;
    fontSize?: string;
    cursor?: string;
    margin?: string;
    textTransform?: string;
}

interface DivProps {
    backgroundColor?: string;
}

interface ExtraInfo {
    description: string;
    wind: string;
    humidity: string;
    pressure: string;
}

interface Props extends InputHTMLAttributes<HTMLInputElement>, DivProps {
    icon?: string;
    dayLabel: string;
    temperature: string;
    onClickTemperature: Function;
    extraInfo?: ExtraInfo;
    color?: string;
}

const Div = styled.div`
    display: flex;
    padding: 15px;
    background-color: ${({ backgroundColor }: DivProps) => backgroundColor};
`;

const P = styled.p`
    font-size: ${(props) => props.fontSize};
    color: ${(props) => props.color};
    margin: ${(props) => props.margin};
    text-transform: ${(props) => props.textTransform};

    ${({ cursor }: ParagraphProps) =>
        cursor &&
        css`
            cursor: ${cursor};
        `}
`;

const weatherCard = ({
    dayLabel,
    backgroundColor,
    color,
    icon,
    temperature,
    extraInfo,
    onClickTemperature,
}: Props) => {
    return (
        <Div backgroundColor={backgroundColor}>
            <Row>
                <Col>
                    {icon ? (
                        <WeatherIcon fill={color} name={icon} width="200px" height="200px" />
                    ) : null}
                </Col>
                <Col>
                    <P fontSize="19pt" color={color}>
                        {dayLabel}
                    </P>
                    <P
                        cursor="pointer"
                        fontSize="19pt"
                        color={color}
                        onClick={() => onClickTemperature()}
                    >
                        {temperature}
                    </P>
                    {extraInfo ? (
                        <div style={{ marginTop: '15px' }}>
                            <P
                                textTransform="capitalize"
                                margin="0 0 15px 0"
                                fontSize="22pt"
                                color={color}
                            >
                                {extraInfo.description}
                            </P>
                            <P fontSize="15pt" color={color}>
                                Vento: {extraInfo.wind}
                            </P>
                            <P fontSize="15pt" color={color}>
                                Humidade: {extraInfo.humidity}
                            </P>
                            <P fontSize="15pt" color={color}>
                                Pressão: {extraInfo.pressure}
                            </P>
                        </div>
                    ) : undefined}
                </Col>
            </Row>
        </Div>
    );
};

export default weatherCard;
