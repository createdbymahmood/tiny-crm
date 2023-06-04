import * as React from 'react';

const updateReducer = (num: number): number => (num + 1) % 1_000_000;

export const useUpdate = (): (() => void) => {
    const [, update] = React.useReducer(updateReducer, 0);
    return update;
};
