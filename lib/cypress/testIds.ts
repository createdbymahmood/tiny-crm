export const createCustomer = {
    cta: 'create-customer-cta',
};

export const deleteCustomer = {
    cta: 'delete-customer-cta',
};
export const viewCustomer = {
    list: {
        title: 'customers-list-title',
    },
    cta: (customerId: string) => `view-customer-${customerId}`,
    content: (customerId: string) =>
        `view-customer-modal-content-${customerId}`,
};
