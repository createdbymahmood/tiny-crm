import {DEFAULT_ERROR_MESSAGE} from '@configs/constants';
import {get} from 'lodash';

export const toClientErrorMessage = (error: unknown): string => {
  try {
    const errorMessage = get(error, ['data', 'message']);
    return errorMessage ?? DEFAULT_ERROR_MESSAGE;
  } catch {
    return DEFAULT_ERROR_MESSAGE;
  }
};
