const heatColor = (temperature?: number): string => {
    if (temperature == null || temperature == undefined) return 'white';

    const BOT_TEMP = -60;
    const MIN_TEMP = 15;
    const MAX_TEMP = 35;
    const TOP_TEMP = 60;
    const MIN_RANGE = 15;

    let colorBind = 233;
    let a = 1;

    if (temperature <= MIN_TEMP) {
        a = (MIN_TEMP - temperature + MIN_RANGE) / (MIN_TEMP - BOT_TEMP);
        return `rgba(0, 0, ${colorBind}, ${a})`;
    } else if (temperature >= MAX_TEMP) {
        a = (temperature + MIN_RANGE) / (TOP_TEMP + MAX_TEMP);
        return `rgba(${colorBind}, 0, 0, ${a})`;
    }

    a = temperature / MAX_TEMP;
    return `rgba(${colorBind}, ${colorBind}, 0, ${a})`;
};

export { heatColor };
