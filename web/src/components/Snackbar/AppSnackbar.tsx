import { ToastContext, useToast } from 'providers/ToastProvider';
import React, { useContext } from 'react';
import { Snackbar as MuiSnackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

export const AppSnackbar = () => {
  const { toast } = useContext(ToastContext);
  const { dispatch } = useToast();

  return (
    <MuiSnackbar
      open={Boolean(toast)}
      autoHideDuration={6000}
      onClose={() => dispatch({ type: 'toast_removed' })}
    >
      <MuiAlert severity={toast?.type}>{toast?.message}</MuiAlert>
    </MuiSnackbar>
  );
};
