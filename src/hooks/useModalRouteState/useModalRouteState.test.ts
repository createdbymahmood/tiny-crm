import { MODAL_AS_ROUTE_CLOSE_DELAY } from '@configs/constants';
import { renderHook } from '@testing-library/react-hooks';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useModalRouteState } from './useModalRouteState';

let mockedUseNavigate;

vi.mock('@tanstack/react-router', () => ({
    ...vi.importActual('@tanstack/react-router'),
    useNavigate: () => mockedUseNavigate,
}));

describe('useModalRouteState()', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        mockedUseNavigate = vi.fn();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.clearAllMocks();
    });

    it('should initiates correctly', () => {
        const hook = renderHook(useModalRouteState);

        expect(typeof hook.result.current).not.toBe('undefined');
    });

    it('should return the correct objects', () => {
        const hook = renderHook(useModalRouteState);

        expect(typeof hook.result.current.modal).toBe('object');
        expect(typeof hook.result.current.modal.isOpen).toBe('boolean');
        expect(typeof hook.result.current.modal.onCancel).toBe('function');
    });

    it('should set isOpen to false when onCancel is called', () => {
        const { result } = renderHook(() => useModalRouteState());
        result.current.modal.onCancel();
        vi.advanceTimersByTime(MODAL_AS_ROUTE_CLOSE_DELAY);

        expect(result.current.modal.isOpen).toBe(false);
    });

    it('should NOT navigate when onCancel is called but MODAL_AS_ROUTE_CLOSE_DELAY MS has not been passed', () => {
        const { result } = renderHook(() => useModalRouteState());
        result.current.modal.onCancel();

        expect(mockedUseNavigate).not.toBeCalled();
    });

    it('should navigate in MODAL_AS_ROUTE_CLOSE_DELAY MS when onCancel is called', () => {
        const { result } = renderHook(() => useModalRouteState());
        result.current.modal.onCancel();

        expect(mockedUseNavigate).not.toBeCalled();

        vi.advanceTimersByTime(MODAL_AS_ROUTE_CLOSE_DELAY);

        expect(mockedUseNavigate).toBeCalled();
    });
});
