import React, { useEffect, useRef, FC, SVGProps } from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: string;
}

export const Icon: FC<IconProps> = ({ name, ...rest }) => {
    const ImportedIconRef = useRef<FC<SVGProps<SVGSVGElement>>>();
    const [loading, setLoading] = React.useState(false);

    const importIcon = async () => {
        setLoading(true);
        import(`@/application/assets/icons/weather/${name}.svg`)
            .then((getIcon) => (ImportedIconRef.current = getIcon.default))
            .then(() => setLoading(false));
    };

    useEffect(() => {
        importIcon();
    }, [name]);
    if (!loading && ImportedIconRef.current) {
        return <ImportedIconRef.current viewBox="0 0 512 512" {...rest} />;
    }
    return null;
};

export default Icon;
