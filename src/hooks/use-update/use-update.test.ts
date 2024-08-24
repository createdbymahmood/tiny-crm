import {renderHook} from '@testing-library/react-hooks';
import {describe, expect, it} from 'vitest';

import {useUpdate} from './use-update';

describe('useUpdate()', () => {
    it('should initiate correctly', () => {
        const hook = renderHook(useUpdate);

        expect(typeof hook.result.current).not.toBe('undefined');
    });

    it('should return a function', () => {
        const hook = renderHook(useUpdate);

        expect(typeof hook.result.current).toBe('function');
    });

    it('should cause a re-render on result function call', () => {
        const hook = renderHook(useUpdate);
        const update = hook.result.current;
        update();
    });

    it('should re-render component each time returned function is called', () => {
        let renders = 0;

        const hook = renderHook(() => {
            renders++;
            return useUpdate();
        });

        const update = hook.result.current;

        expect(renders).toBe(1);

        update();

        expect(renders).toBe(2);

        update();

        expect(renders).toBe(3);
    });
});
