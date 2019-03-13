import { shuffleArray } from './array.util';

describe('shuffleArray', () => {
  it('returns the original array shuffled in place', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(original);
    // same reference
    expect(original).toBe(shuffled);
    // ensure at least one element has moved
    let isDifferent = false;
    original.forEach((item, index) => {
      if (shuffled[index] !== index + 1) {
        isDifferent = true;
      }
    });

    expect(isDifferent).toBe(true);
  });
});
