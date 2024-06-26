import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { sleep } from '@/utils/sleep';

import { lazyImport } from './lazyImport';

const loadingIndicator = 'Loading...';

describe('lazyImport', () => {
    it('should render without any props', () => {
        const LazyComponent = lazyImport(() => import('./ExampleComponent'));
        const { container } = render(<LazyComponent />);

        expect(container).toMatchSnapshot();
    });

    it('displays fallback element while loading', async () => {
        const LazyComponent = lazyImport(
            () => sleep(1000).then(() => import('./ExampleComponent')),
            undefined,
            { fallback: <div>{loadingIndicator}</div> },
        );
        render(<LazyComponent />);
        const loadingElement = await screen.findByText(loadingIndicator);

        expect(loadingElement).not.toBeUndefined();
        expect(loadingElement).not.toBeNull();
    });
});
