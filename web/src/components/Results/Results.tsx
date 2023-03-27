import React from 'react';
import { Badge, Box, Chip, CircularProgress, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useAsync } from 'hooks/useAsync';
import { ISuburb } from 'types';
import { ResultCard } from './ResultCard';
import Illustration from 'assets/home_illustration.svg';
import { useSuburbQuery } from 'providers/SuburbQueryProvider';

const ResultsEmptyState = () => {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" py={4}>
        <img
          src={Illustration}
          alt=""
          style={{
            maxWidth: '330px',
          }}
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography gutterBottom fontWeight={'bold'} color={grey[600]} variant="h6">
          No Results Yet
        </Typography>
      </Box>
    </>
  );
};

const ResultsWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ background: 'white', px: 4, py: 3, borderRadius: 2, boxShadow: 1, mb: 8 }}>
      {children}
    </Box>
  );
};

const SuburbCards = React.memo(({ suburbs }: { suburbs: ISuburb[] }) => {
  return (
    <>
      {suburbs.map((suburb: ISuburb, index: number) => (
        <ResultCard
          suburb={suburb}
          key={suburb.suburb_name + '_' + suburb.suburb_postcode}
          rank={index}
        />
      ))}
    </>
  );
});

export const Results = () => {
  const searchQuery = useSuburbQuery();

  if (searchQuery.status === 'idle' && searchQuery.data === null) {
    return (
      <ResultsWrapper>
        <ResultsEmptyState />
      </ResultsWrapper>
    );
  }

  if (searchQuery.status === 'pending') {
    return (
      <ResultsWrapper>
        <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress thickness={8} size={100} />
        </Box>
      </ResultsWrapper>
    );
  }

  if (searchQuery.status === 'resolved') {
    return (
      <ResultsWrapper>
        <Typography fontWeight="bold" color={grey[800]} variant="h5" component="h3">
          Top Suburbs for <Box component="span">"{searchQuery.data.uni_name}"</Box>
        </Typography>
        {/* <Box pt={3}>
          <Chip label="Rent" size="medium" color="info"></Chip>
        </Box> */}
        <Stack py={4} spacing={2}>
          <SuburbCards suburbs={searchQuery.data.data} />
        </Stack>
      </ResultsWrapper>
    );
  }

  return <></>;
};
