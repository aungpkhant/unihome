import { Box, CircularProgress, Tooltip, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import React from 'react';

function StatCircle(props: {
  progress: number;
  label: string;
  stat: number | string;
  tooltip: string;
}) {
  const { progress, label, stat, tooltip } = props;

  return (
    <Box>
      <Box sx={{ position: 'relative', display: 'inline-flex' }} color={grey[300]} mb={1}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={80}
          thickness={6}
          sx={{ position: 'absolute' }}
          color={'inherit'}
        />
        <CircularProgress
          variant="determinate"
          value={progress}
          size={80}
          thickness={6}
          color="secondary"
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography component="div" color="text.secondary" fontWeight="bold" variant="body2">
            {stat}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Box display="flex" mx={'auto'} width="fit-content">
          <Tooltip title={tooltip}>
            <Typography textAlign={'center'} fontWeight="bold">
              {label}
            </Typography>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

export default StatCircle;
