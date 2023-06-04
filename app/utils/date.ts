import { ISO_8601_DATE_FORMAT } from '@configs/constants';
import type { Dayjs } from 'dayjs';

export const toIso8601DateFormat = (date?: Dayjs) => {
    return date ? date.format(ISO_8601_DATE_FORMAT) : null;
};
