import type { ObjectPath } from '@types';
import { paths } from 'app/routes/paths';
import { get } from 'lodash';
import type { ParamMap } from 'urlcat';
import generatePath from 'urlcat';

export const createRoute = (
    path: ObjectPath<typeof paths>,
    params: ParamMap = {},
) => {
    try {
        return generatePath(get(paths, path as string), params);
    } catch (error) {
        console.error('Failed to generate route', error);
        return '';
    }
};
