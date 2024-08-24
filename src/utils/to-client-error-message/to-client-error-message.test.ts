import {DEFAULT_ERROR_MESSAGE} from '@configs/constants';
import {describe, expect, it} from 'vitest';

import {toClientErrorMessage} from './to-client-error-message';

describe('toClientErrorMessage', () => {
  it('should return DEFAULT_ERROR_MESSAGE if error is not an object', () => {
    const error = 'error';
    const errorMessage = toClientErrorMessage(error);

    expect(errorMessage).toBe(DEFAULT_ERROR_MESSAGE);
  });

  it('should return DEFAULT_ERROR_MESSAGE if error is not an object', () => {
    const error = null;
    const errorMessage = toClientErrorMessage(error);

    expect(errorMessage).toBe(DEFAULT_ERROR_MESSAGE);
  });

  it('should return DEFAULT_ERROR_MESSAGE when error object has no data or message property', () => {
    const error = {status: 404};

    expect(toClientErrorMessage(error)).toEqual(DEFAULT_ERROR_MESSAGE);
  });

  test('should return DEFAULT_ERROR_MESSAGE when error object message property is falsy', () => {
    const error = {data: {message: null}};

    expect(toClientErrorMessage(error)).toEqual(DEFAULT_ERROR_MESSAGE);
  });
});
