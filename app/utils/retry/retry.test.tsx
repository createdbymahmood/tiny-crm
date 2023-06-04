import { retry } from '@utils/retry';
import { describe, it } from 'vitest';

describe('retry()', () => {
    it('returns a Promise', () => {
        const result = retry(() => Promise.resolve());
        expect(result).toBeInstanceOf(Promise);
    });

    it('retries N times', async () => {
        let count = 0;

        const fn = async () => {
            count++;

            if (count < 3) {
                return Promise.reject(new Error('Something went wrong'));
            }
            return Promise.resolve('Success');
        };

        await retry(fn, 3, 0);
        expect(count).toBe(3);
    });

    it('rejects when the maximum number of retries is reached', async () => {
        const fn = (): Promise<unknown> =>
            Promise.reject(new Error('Something went wrong'));

        try {
            await retry(fn, 3, 0);
        } catch (error) {
            expect(error.message).toBe('Something went wrong');
        }
    });

    it('delays retrying by the specified interval', async () => {
        let count = 0;
        const startTime = Date.now();
        const fn = () => {
            count++;
            if (count < 3) {
                return Promise.reject(new Error('Something went wrong'));
            }
            return Promise.resolve('Success');
        };
        const interval = 1000;
        await retry(fn, 3, interval);
        const endTime = Date.now();
        expect(endTime - startTime).toBeGreaterThanOrEqual(interval * 2);
    });
});
