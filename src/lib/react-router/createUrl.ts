import type { DotNotationObjectPath } from '@types';
import { get } from 'lodash';
import type { ParamMap } from 'urlcat';
import generatePath from 'urlcat';

import { paths } from '@/lib/react-router/paths';

export const createUrl = (
    path: DotNotationObjectPath<typeof paths>,
    params: ParamMap = {},
) => {
    try {
        return generatePath(get(paths, path as string), params);
    } catch (error) {
        console.error('Failed to generate route', error);
        return '';
    }
};
