export function providesList<
    R extends {id: number | string}[],
    T extends string,
>({resultsWithIds, tagType}: {resultsWithIds: R | undefined; tagType: T}) {
    return resultsWithIds
        ? [
              {type: tagType, id: 'LIST'},
              ...resultsWithIds.map(({id}) => ({type: tagType, id})),
          ]
        : [{type: tagType, id: 'LIST'}];
}
