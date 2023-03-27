import { useState } from 'react';
import { grey } from '@mui/material/colors';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  Slider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { weightageOptions } from 'constants/';
import { useUniversities } from 'hooks/useUniversity';
import { useSuburbFilters, useSuburbFiltersDispatch } from 'providers/SuburbFilterProvider';
import { useSuburbQuery } from 'providers/SuburbQueryProvider';
import { IFactorWeightages, WeightageValues } from 'types';
import { globalToastState, useToast } from 'providers/ToastProvider';

export const AFilter = () => {
  const uniQuery = useUniversities();
  const { university, factorWeightages } = useSuburbFilters();
  const dispatch = useSuburbFiltersDispatch();

  const { fetch } = useSuburbQuery();
  const { toast } = useToast();

  const UniOptions = uniQuery?.data.map((uniOption) => (
    <MenuItem value={uniOption as any} key={uniOption.uni_name}>
      {uniOption.uni_name}
    </MenuItem>
  ));

  return (
    <Box sx={{ background: 'white', px: 4, pt: 3, borderRadius: 2, boxShadow: 1 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Link to="/" style={{ lineHeight: 0 }}>
          <ArrowBackIosIcon fontSize="medium" sx={{ color: grey[800] }} />
        </Link>
        <Typography variant="h5" fontWeight={'700'} gutterBottom color={grey[800]}>
          Advanced Search
        </Typography>
      </Stack>
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
          <InputLabel>Cost of Rent</InputLabel>
          <Select
            label="Cost of Rent"
            name="rent"
            onChange={(e) => {
              dispatch({
                type: 'factor_weightages_changed',
                payload: {
                  factor: e.target.name as keyof IFactorWeightages,
                  weightage: e.target.value as WeightageValues,
                },
              });
            }}
            value={factorWeightages.rent}
          >
            {weightageOptions.map((weight) => (
              <MenuItem value={weight.value} key={weight.value}>
                {weight.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Safety and Low Crime Rate</InputLabel>
          <Select
            label="Safety and Low Crime Rate"
            name="crime_rate"
            onChange={(e) => {
              dispatch({
                type: 'factor_weightages_changed',
                payload: {
                  factor: e.target.name as keyof IFactorWeightages,
                  weightage: e.target.value as WeightageValues,
                },
              });
            }}
            value={factorWeightages.crime_rate}
          >
            {weightageOptions.map((weight) => (
              <MenuItem value={weight.value} key={weight.value}>
                {weight.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Distance to University</InputLabel>
          <Select
            label="Distance to University"
            name="distance"
            onChange={(e) => {
              dispatch({
                type: 'factor_weightages_changed',
                payload: {
                  factor: e.target.name as keyof IFactorWeightages,
                  weightage: e.target.value as WeightageValues,
                },
              });
            }}
            value={factorWeightages.distance}
          >
            {weightageOptions.map((weight) => (
              <MenuItem value={weight.value} key={weight.value}>
                {weight.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Box mt={3} mx={-4}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{
            py: 2,
            borderTopLeftRadius: 'initial',
            borderTopRightRadius: 'initial',
            flexGrow: 1,
          }}
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
            if (
              factorWeightages.rent + factorWeightages.crime_rate + factorWeightages.distance ===
              0
            ) {
              toast({
                id: globalToastState.toastId,
                type: 'error',
                message: 'Cannot have ALL factors as non-factor',
              });
              globalToastState.increment();
              return;
            }
            fetch({
              uni_code: university.uni_code,
              ...factorWeightages,
            });
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};
