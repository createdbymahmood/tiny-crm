import { deepObjectTransformer } from '@utils/deepObjectTransformer';
import { isEmpty, isNull, isString } from 'lodash';

/**
 *
 * @param obj  - object to transform
 * @returns object with empty values transformed to null
 */
export function transformEmptyValuesToNull<T>(obj: T) {
    return deepObjectTransformer<T>({
        obj,
        predicate: value =>
            isNull(value) || (isString(value) && isEmpty(value)),
        transformer: () => null,
    });
}
