import { Box, CircularProgress } from '@mui/material';
import { useUniversities } from 'hooks/useUniversity';
import React from 'react';

// This higher order component returns a loading screen while data is loading
export const DataLoader = ({ children }: { children: React.ReactNode }) => {
  const query = useUniversities();

  if (query!.status !== 'resolved') {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
};
