import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Typography,
  Stack,
  Chip,
  Tooltip,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { ISuburb } from 'types';
import StatCircle from './StatCircle';
import TrainIcon from '@mui/icons-material/Train';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TramIcon from '@mui/icons-material/Tram';

export const ResultCard = ({ suburb, rank }: { suburb: ISuburb; rank: number }) => {
  return (
    <Box component="article" display="flex" border="solid 1px" borderColor={grey[500]}>
      <Box
        width={200}
        sx={{ background: 'peachpuff' }}
        minHeight={270}
        borderRight="solid 1px"
        borderColor={grey[500]}
      >
        <img
          src={`/assets/images/suburb.jpg`}
          loading="lazy"
          style={{ height: '100%', objectFit: 'cover' }}
        />
      </Box>
      <Box flexGrow={1} px={4} py={2}>
        <Box display="flex" justifyContent="space-between" alignItems="end">
          <Box display="flex">
            <Typography fontSize="large" fontWeight="bold" color={grey[800]}>
              {`#${rank + 1}`}
              <Box component="span" fontSize={20} ml={2}>
                {suburb.suburb_name}
              </Box>
            </Typography>
            <Box sx={{ marginLeft: 2 }}>
              <Chip label={suburb.suburb_postcode} variant="outlined" />
            </Box>
          </Box>
          <Typography color={grey[800]} fontSize="large" fontWeight="bold">
            {`Score: ${suburb.scaled_overall_score}`}
          </Typography>
        </Box>
        <Grid pt={6} container>
          <Grid item xs={4} container alignItems="center" justifyContent="center">
            <StatCircle
              progress={suburb.rent_score}
              stat={`$${Math.round(suburb.rent_price)}`}
              label="Rent"
              tooltip="Average cost of rent per week in the suburb"
            />
          </Grid>

          {/* Crime Rate */}
          <Grid item xs={4} container alignItems="center" justifyContent="center">
            <StatCircle
              progress={suburb.crime_score}
              stat={suburb.crime_count}
              label="Safety"
              tooltip="Incidents of crime in the suburb"
            />
          </Grid>
          <Grid item xs={4} container alignItems="center" justifyContent="center">
            <StatCircle
              progress={suburb.distance_score}
              stat={`${suburb.distance_in_km.toFixed(1)} km`}
              label="Distance"
              tooltip="Distance to university from the suburb"
            />
          </Grid>
        </Grid>
        <Stack direction={'row'} mt={6} spacing={2.5} color={grey[700]}>
          <Box display={'flex'}>
            <Tooltip title="Train Stop Count">
              <TrainIcon sx={{ mr: 1 }} />
            </Tooltip>
            <Typography>{suburb.train_count}</Typography>
          </Box>
          <Box display={'flex'}>
            <Tooltip title="Bus Stop Count">
              <DirectionsBusIcon sx={{ mr: 1 }} />
            </Tooltip>
            <Typography>{suburb.train_count}</Typography>
          </Box>
          <Box display={'flex'}>
            <Tooltip title="Tram Stop Count">
              <TramIcon sx={{ mr: 1 }} />
            </Tooltip>
            <Typography>{suburb.train_count}</Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
