import React, { useState, useEffect } from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
    name: string;
}

const weatherIcon = ({ name, ...rest }: Props) => {
    let [icon, setIcon] = useState('');

    const test = async () => {
        let importedIcon = await import(`@/application/assets/icons/weather/${name}.svg`);
        setIcon(importedIcon.default);
    };

    useEffect(() => {
        test();
    }, []);

    return <img alt="" src={icon} {...rest} />;
};

export default weatherIcon;
