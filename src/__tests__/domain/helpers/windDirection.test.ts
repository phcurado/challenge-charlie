import { windDirection } from '@/domain/helper/windDirection';

describe('Compute wind direction', () => {
    test('Should point to N or NE', () => {
        let direction = windDirection(0);
        expect(direction).toBe('N');

        direction = windDirection(40);
        expect(direction).toBe('N');

        direction = windDirection(45);
        expect(direction).toBe('NE');

        direction = windDirection(56);
        expect(direction).toBe('NE');

        direction = windDirection(80);
        expect(direction).toBe('NE');
    });

    test('Should point to E or SE', () => {
        let direction = windDirection(90);
        expect(direction).toBe('E');

        direction = windDirection(100);
        expect(direction).toBe('E');

        direction = windDirection(135);
        expect(direction).toBe('SE');

        direction = windDirection(160);
        expect(direction).toBe('SE');
    });

    test('Should point to S or SO', () => {
        let direction = windDirection(180);
        expect(direction).toBe('S');

        direction = windDirection(224);
        expect(direction).toBe('S');

        direction = windDirection(225);
        expect(direction).toBe('SO');

        direction = windDirection(269);
        expect(direction).toBe('SO');
    });

    test('Should point to O or NO', () => {
        let direction = windDirection(270);
        expect(direction).toBe('O');

        direction = windDirection(275);
        expect(direction).toBe('O');

        direction = windDirection(315);
        expect(direction).toBe('NO');

        direction = windDirection(350);
        expect(direction).toBe('NO');

        direction = windDirection(360);
        expect(direction).toBe('N');

        direction = windDirection(460);
        expect(direction).toBe('N');
    });
});
