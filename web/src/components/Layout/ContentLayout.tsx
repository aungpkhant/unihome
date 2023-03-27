import { Box, Grid } from '@mui/material';
import Appbar from '../Appbar';

type ContentLayoutProps = {
  leftChild?: React.ReactNode;
  rightChild?: React.ReactNode;
};

export const ContentLayout = ({ leftChild, rightChild }: ContentLayoutProps) => {
  return (
    <Box
      position="relative"
      component="main"
      sx={{
        minHeight: '100vh',
        px: 8,
      }}
    >
      <Box
        position="fixed"
        sx={{
          backgroundImage: "url('/assets/images/mainbg.png')",
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          inset: '0 0 0 0',
          zIndex: -1,
        }}
      ></Box>
      <Appbar />
      <Box sx={{ pt: 8, minHeight: 'calc(100vh - 64px)', boxSizing: 'initial' }}>
        <Grid container spacing={8} sx={{ pt: 8 }}>
          <Grid item xs={5}>
            {leftChild}
          </Grid>
          <Grid item xs={7}>
            {rightChild}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
