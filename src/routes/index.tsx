import {createFileRoute, redirect} from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: () => null,
    beforeLoad() {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw redirect({to: '/customers'});
    },
});
