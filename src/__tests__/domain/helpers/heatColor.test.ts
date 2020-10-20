import { heatColor } from '@/domain/helper/heatColor';

test('Should show Blue based color', () => {
    const color = heatColor(15);
    expect(color).toBe('rgba(0, 0, 233, 0.2)');
});
