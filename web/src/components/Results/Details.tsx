import { Box, Button, ButtonGroup, Grid, Typography, Stack, Rating } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { ISuburb } from 'types';

export const Details = ({ suburb}: { suburb: ISuburb}) => {
    const [ratingVal, setRatingVal] = React.useState<number|null>(2);

    return (
        <>
            <Box sx={{ width: 1, background: 'peachpuff' }} height={200}>
                <img
                src={`/assets/images/suburb.jpg`}
                loading="lazy"
                style={{ height: '100%', objectFit: 'cover'}}
                />
            </Box>

            <Stack direction="row">
                <Typography fontSize="large" fontWeight="bold" color={grey[800]}>
                    {suburb.suburb_name}
                </Typography>
                <Typography fontWeight="bold" fontSize={20}>
                    {' '}
                    {`Average Rent $${suburb.rent_price} per week`}
                </Typography>
            </Stack>

            <Stack direction="row">
                <Typography fontSize="large" color={grey[800]}>
                    Suburb description ??
                </Typography>
                <Typography fontWeight="bold" fontSize={20}>
                    {' '}
                    Number of train stations: ??
                </Typography>
            </Stack>
            
            <Grid container spacing={2} columns={16} >
                <Grid item xs={8}>
                    <Stack spacing={2}>
                        <Stack direction="row">
                            <Rating
                                name="size-large"
                                size="large"
                                value={ratingVal}
                                defaultValue={2.5}
                                precision={0.5}
                                onChange={(event, newValue) => {
                                    setRatingVal(newValue);
                                }}
                            />
                            <Typography fontSize={16}>
                                Safety
                            </Typography>
                        </Stack>
                        <Stack direction="row">
                            <Rating
                                name="size-large"
                                size="large"
                                value={ratingVal}
                                defaultValue={2.5}
                                precision={0.5}
                                onChange={(event, newValue) => {
                                    setRatingVal(newValue);
                                }}
                            />
                            <Typography fontSize={16}>
                                Budget Friendly
                            </Typography>
                        </Stack>
                        <Stack direction="row">
                            <Rating
                                name="size-large"
                                size="large"
                                value={ratingVal}
                                defaultValue={2.5}
                                precision={0.5}
                                onChange={(event, newValue) => {
                                    setRatingVal(newValue);
                                }}
                            />
                            <Typography fontSize={16}>
                                Access to public transport
                            </Typography>
                        </Stack>
                    </Stack>
                </Grid>

                <Grid item xs={8}>

                </Grid>

            </Grid>


            

        </>
    );
};