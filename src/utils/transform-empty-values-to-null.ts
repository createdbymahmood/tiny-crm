import {isEmpty, isNull, isString} from 'lodash';

import {transformObjectValues} from '@/utils/transform-object-values';

/**
 *
 * @param obj  - object to transform
 * @returns object with empty values transformed to null
 */
export function transformEmptyValuesToNull<T>(obj: T) {
  return transformObjectValues<T>({
    obj,
    predicate: value => isNull(value) || (isString(value) && isEmpty(value)),
    transformer: () => null,
  });
}
