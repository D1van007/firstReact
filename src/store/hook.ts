import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '.';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch: () => AppDispatch = useDispatch;
// eslint-disable-next-line import/prefer-default-export
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
