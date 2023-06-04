import { isArray, isObject, map, transform } from 'lodash';

interface DeepObjectTransformerParams<T> {
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
export function deepObjectTransformer<T>({
    obj,
    predicate,
    transformer,
}: DeepObjectTransformerParams<T>): T {
    try {
        return transform(
            obj as unknown[],
            (result: any, value: any, key: string) => {
                if (predicate(value)) {
                    result[key] = transformer(value);
                } else if (isArray(value)) {
                    result[key] = map(value, item =>
                        deepObjectTransformer({
                            obj: item,
                            predicate,
                            transformer,
                        }),
                    );
                } else if (isObject(value)) {
                    result[key] = deepObjectTransformer({
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
