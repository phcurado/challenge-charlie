import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import WeatherIcon from '@/application/components/icon/WeatherIcon';
import Row from '@/application/components/Row';
import Col from '@/application/components/Column';

interface ParagraphProps {
    color?: string;
    fontSize?: string;
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

interface Props extends InputHTMLAttributes<HTMLInputElement>, ParagraphProps, DivProps {
    icon?: string;
    dayLabel: string;
    temperature: string;
    extraInfo?: ExtraInfo;
}

const Div = styled.div`
    display: flex;
    padding: 15px;
    background-color: ${({ backgroundColor }: DivProps) => backgroundColor};
`;

const P = styled.p`
    font-size: ${({ fontSize }: ParagraphProps) => fontSize};
    color: ${({ color }: ParagraphProps) => color};
`;

const weatherCard = ({ dayLabel, backgroundColor, color, icon, temperature, extraInfo }: Props) => {
    return (
        <Div backgroundColor={backgroundColor}>
            <Row>
                <Col>
                    {icon ? (
                        <WeatherIcon fill={color} name={icon} width="200px" height="200px" />
                    ) : null}
                </Col>
                <Col>
                    <P fontSize="22pt" color={color}>
                        {dayLabel}
                    </P>
                    <P fontSize="22pt" color={color}>
                        {temperature}
                    </P>
                    {extraInfo ? (
                        <div>
                            <P fontSize="22pt" color={color}>
                                {extraInfo.description}
                            </P>
                            <P fontSize="15pt" color={color}>
                                {extraInfo.wind}
                            </P>
                            <P fontSize="15pt" color={color}>
                                {extraInfo.humidity}
                            </P>
                            <P fontSize="15pt" color={color}>
                                {extraInfo.pressure}
                            </P>
                        </div>
                    ) : undefined}
                </Col>
            </Row>
        </Div>
    );
};

export default weatherCard;
