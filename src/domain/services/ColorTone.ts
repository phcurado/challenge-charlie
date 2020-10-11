import BaseService from '@/domain/base/BaseService';

/**
 * Small domain service for defining the color tone based on temperature
 */
class ColorTone extends BaseService {
    MIN_TEMP = 15;
    MAX_TEMP = 35;
    static defineForTemperature(temperature: number) {
        if (temperature < 15) {
            return 'blue';
        } else if (temperature > 35) {
            return 'red';
        }
        return 'yellow';
    }
}

export default ColorTone;
