import { getColors } from './color.util';
describe('getColors', () => {
  it('returns a repeating array of color hex codes', () => {
    const colors = getColors(7);
    expect(colors).toEqual([
      '#5FCFA8',
      '#F8BD30',
      '#47443A',
      '#573C2C',
      '#9D4640',
      '#5FCFA8',
      '#F8BD30',
    ]);
  });
});
