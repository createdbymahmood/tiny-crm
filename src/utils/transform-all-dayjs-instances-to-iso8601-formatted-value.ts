import {ISO_8601_DATE_FORMAT} from '@configs/constants';
import type {Dayjs} from 'dayjs';
import dayJS from 'dayjs';

import {transformObjectValues} from '@/utils/transform-object-values';

/**
 *
 * @param obj - object to transform
 * @returns object with all dayjs instances transformed to ISO 8601 formatted value
 */

export function transformAllDayjsInstancesToIso8601FormattedValue<T>(obj: T) {
  return transformObjectValues<T>({
    obj,
    predicate: value => dayJS.isDayjs(value),
    transformer: (value: Dayjs) => value.format(ISO_8601_DATE_FORMAT),
  });
}
