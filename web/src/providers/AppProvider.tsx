import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DataLoader } from 'components/DataLoader/DataLoader';
import { UniversityProvider, useUniversities } from 'hooks/useUniversity';
import { SuburbFilterProvider } from './SuburbFilterProvider';
import { SuburbQueryProvider } from './SuburbQueryProvider';

import { theme } from 'lib/theme';
import { ToastProvider } from './ToastProvider';
import { AppSnackbar } from 'components/Snackbar/AppSnackbar';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <UniversityProvider>
          <DataLoader>
            <SuburbFilterProvider>
              <SuburbQueryProvider>{children}</SuburbQueryProvider>
              <AppSnackbar />
            </SuburbFilterProvider>
          </DataLoader>
        </UniversityProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};
