export function providesList<
    R extends { id?: string | number }[],
    T extends string,
>(resultsWithIds: R | undefined, tagType: T) {
    return resultsWithIds
        ? [
              { type: tagType, id: 'LIST' },
              ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
          ]
        : [{ type: tagType, id: 'LIST' }];
}
