import { createContext, useCallback, useContext, useReducer } from 'react';

export let globalToastState = {
  toastId: 1,
  increment: function () {
    this.toastId++;
  },
};

export type Toast = {
  id: number;
  type: 'success' | 'info' | 'error';
  message: string;
};

type ToastContextState = {
  toast: Toast | null;
};

const initialState: ToastContextState = {
  toast: null,
};

// @ts-ignore
export const ToastContext = createContext<ToastContextState>(null);
// @ts-ignore
const ToastActionDispatchContext = createContext<React.Dispatch<ToastAction>>(null);

type ToastAction =
  | {
      type: 'toast_added';
      payload: Toast;
    }
  | {
      type: 'toast_removed';
    };

const toastReducer = (state: ToastContextState, action: ToastAction): ToastContextState => {
  switch (action.type) {
    case 'toast_added':
      return {
        ...state,
        toast: action.payload,
      };
    case 'toast_removed':
      return {
        ...state,
        toast: null,
      };
    default:
      throw new Error('Invalid action type');
  }
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  return (
    <ToastContext.Provider value={state}>
      <ToastActionDispatchContext.Provider value={dispatch}>
        {children}
      </ToastActionDispatchContext.Provider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const dispatch = useContext(ToastActionDispatchContext);

  const toast = useCallback(
    (t: Toast) => {
      dispatch({
        type: 'toast_added',
        payload: t,
      });
    },
    [dispatch]
  );

  return { toast, dispatch };
}
