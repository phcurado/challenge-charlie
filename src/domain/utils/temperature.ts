const celsiusToFahrenheit = (celsiusTemp: number) => {
    return (celsiusTemp * 9) / 5 + 32;
};

const fahrenheitToCelsius = (fahrenheitTemp: number) => {
    return ((fahrenheitTemp - 32) * 5) / 9;
};

export { celsiusToFahrenheit, fahrenheitToCelsius };
