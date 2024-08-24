import {describe, expect, it} from 'vitest';

import {sleep} from './sleep'; // Replace with the actual path to your file

describe('sleep', () => {
  it('should resolve after the specified time', async () => {
    const startTime = Date.now();
    const delay = 500;
    await sleep(delay);
    const endTime = Date.now();

    expect(endTime - startTime).toBeGreaterThanOrEqual(delay);
  });

  it('should resolve with the provided data', async () => {
    const data = {message: 'Hello, world!'};
    const result = await sleep(100, data);

    expect(result).toEqual(data);
  });

  it('should resolve with undefined if no data is provided', async () => {
    const result = await sleep(100);

    expect(result).toBeUndefined();
  });
});
