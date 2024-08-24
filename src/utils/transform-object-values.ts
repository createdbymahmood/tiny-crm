import {isArray, isObject, map, transform} from 'lodash';

interface TransformObjectValuesParams<T> {
    obj: T;
    predicate: (value: any) => boolean;
    transformer: (value: any) => any;
}

/**
 *
 * @param obj - object to transform
 * @param predicate - function that returns true if value should be transformed
 * @param transformer - function that transforms value
 * @returns object with transformed values
 */
export function transformObjectValues<T>({
    obj,
    predicate,
    transformer,
}: TransformObjectValuesParams<T>): T {
    try {
        return transform(
            obj as unknown[],
            (result: any, value: any, key: string) => {
                if (predicate(value)) {
                    result[key] = transformer(value);
                } else if (isArray(value)) {
                    result[key] = map(value, item =>
                        transformObjectValues({
                            obj: item,
                            predicate,
                            transformer,
                        }),
                    );
                } else if (isObject(value)) {
                    result[key] = transformObjectValues({
                        obj: value,
                        predicate,
                        transformer,
                    });
                } else {
                    result[key] = value;
                }
            },
        );
    } catch (error) {
        return obj;
    }
}
