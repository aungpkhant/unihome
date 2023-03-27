// @ts-nocheck

import React, { Reducer } from 'react';
import { QueryState } from 'types';

type ActionType<TData, TError> =
  | { type: 'pending' }
  | { type: 'resolved'; data: TData }
  | { type: 'rejected'; error: TError };

function asyncReducer<TData, TError>(state: QueryState<TData>, action: ActionType<TData, TError>) {
  switch (action.type) {
    case 'pending': {
      return { status: 'pending', data: null, error: null };
    }
    case 'resolved': {
      return { status: 'resolved', data: action.data, error: null };
    }
    case 'rejected': {
      return { status: 'rejected', data: null, error: action.error };
    }
    default: {
      throw new Error('Unhandled action type');
    }
  }
}

function useSafeDispatch(dispatch: React.Dispatch<any>) {
  const mounted = React.useRef(false);

  //   @ts-ignore
  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  }, []);

  //   @ts-ignore
  return React.useCallback((...args) => (mounted.current ? dispatch(...args) : void 0), [dispatch]);
}

export function useAsync<IData>(initialState?: IData) {
  const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  });

  const dispatch = useSafeDispatch(unsafeDispatch);

  const { data, error, status } = state;

  const run = React.useCallback(
    (promise) => {
      dispatch({ type: 'pending' });
      promise.then(
        (data: IData) => {
          dispatch({ type: 'resolved', data });
        },
        (error) => {
          dispatch({ type: 'rejected', error });
        }
      );
    },
    [dispatch]
  );

  const setData = React.useCallback(
    (data: IData) => dispatch({ type: 'resolved', data }),
    [dispatch]
  );
  const setError = React.useCallback((error) => dispatch({ type: 'rejected', error }), [dispatch]);

  return {
    setData,
    setError,
    error,
    status,
    data,
    run,
  };
}
