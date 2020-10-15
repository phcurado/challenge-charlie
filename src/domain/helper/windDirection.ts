const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];

const windDirection = (degree: number) => {
    const directionPerDegree = 360 / DIRECTIONS.length;
    const i = Math.round(degree / directionPerDegree);
    return DIRECTIONS[i];
};

export { windDirection };
