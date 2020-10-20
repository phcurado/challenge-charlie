const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
const MAX_DEGREE = 360;
const MIN_DEGREE = 0;

const windDirection = (degree: number) => {
    const directionPerDegree = MAX_DEGREE / DIRECTIONS.length;
    const i = Math.floor(degree / directionPerDegree);
    return DIRECTIONS[i] || 'N';
};

export { windDirection };
