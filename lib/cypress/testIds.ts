export const createCustomer = {
    cta: 'create-customer-cta',
    form: {
        root: 'create-customer-form',
        elements: {
            company: 'create-customer-form-name',
            industry: 'create-customer-form-industry',
            about: 'create-customer-form-about',
            projects: {
                name: 'create-customer-form-projects-name',
                contact: 'create-customer-form-projects-contact',
            },
            submit: 'create-customer-form-submit',
        },
    },
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
