import { AppProvider } from 'providers/AppProvider';
import { ContentLayout } from 'components/Layout/ContentLayout';
import React, { Dispatch, SetStateAction } from 'react';
import { grey } from '@mui/material/colors';
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { Factor, IUniversity } from 'types';
import { useUniversities } from 'hooks/useUniversity';
import { useNavigate } from 'react-router-dom';
import { useAsync } from 'hooks/useAsync';
import { useSuburbFilters, useSuburbFiltersDispatch } from 'providers/SuburbFilterProvider';
import { useSuburbQuery } from 'providers/SuburbQueryProvider';
import { getQuickSearchWeightage } from 'utils';
import { globalToastState, useToast } from 'providers/ToastProvider';

export const Home = () => {
  const uniQuery = useUniversities();
  const { university, quickSearchFactor } = useSuburbFilters();
  const dispatch = useSuburbFiltersDispatch();
  const navigate = useNavigate();

  const { toast } = useToast();

  const { status, fetch } = useSuburbQuery();

  const UniOptions = uniQuery?.data.map((uniOption) => (
    <MenuItem value={uniOption as any} key={uniOption.uni_name}>
      {uniOption.uni_name}
    </MenuItem>
  ));

  return (
    <Box sx={{ background: 'white', px: 4, pt: 3, borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h5" fontWeight={'700'} gutterBottom color={grey[800]}>
        Let us guide you to your ideal suburb
      </Typography>
      <Stack spacing={3} mt={3}>
        <FormControl fullWidth>
          <InputLabel id="university-select-label">Which university do you go to?</InputLabel>
          <Select
            labelId="university-select-label"
            id="university-select"
            label="Which university do you go to?"
            value={university}
            onChange={(e) => {
              dispatch({
                type: 'university_changed',
                // @ts-ignore
                payload: e.target.value,
              });
            }}
          >
            {UniOptions}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="priority-factor-select-label">
            What is the most important factor to you?
          </InputLabel>
          <Select
            labelId="priority-factor-select-label"
            id="priority-factor-select"
            label="What is the most important factor to you?"
            onChange={(e) => {
              dispatch({
                type: 'quicksearch_factor_changed',
                payload: e.target.value as Factor,
              });
            }}
            value={quickSearchFactor}
          >
            <MenuItem value={'rent'}>Affordable Rent</MenuItem>
            <MenuItem value={'crime_rate'}>Safety</MenuItem>
            <MenuItem value={'distance'}>Distance to University</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Box mt={3} mx={-4}>
        <ButtonGroup variant="contained" fullWidth>
          <Button
            size="large"
            fullWidth
            sx={{
              py: 2,
              borderTopLeftRadius: 'initial',
              borderTopRightRadius: 'initial',
              flexGrow: 1,
            }}
            onClick={() => {
              navigate('/filter');
            }}
          >
            Advanced Search
          </Button>
          <Button
            size="large"
            fullWidth
            sx={{ py: 2, borderTopLeftRadius: 'initial', borderTopRightRadius: 'initial' }}
            onClick={() => {
              if (!university) {
                toast({
                  id: globalToastState.toastId,
                  type: 'error',
                  message: 'Please select a university first',
                });
                globalToastState.increment();
                return;
              }
              fetch({
                uni_code: university.uni_code,
                ...getQuickSearchWeightage(quickSearchFactor),
              });
            }}
            disabled={status === 'pending'}
          >
            Quick Search
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};
