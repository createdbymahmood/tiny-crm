export const getTestAttributes = (id: string | undefined) => {
    return id ? {[`data-testid`]: id} : undefined;
};
