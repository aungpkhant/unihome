import { Paper } from '@mui/material';

export const Welcome = () => {
  return (
    <Paper
      sx={{
        mx: 'auto',
        mt: 8,
        maxWidth: 'md',
        px: 2.5,
        py: 2,
      }}
      variant="outlined"
    >
      Welcome
    </Paper>
  );
};
