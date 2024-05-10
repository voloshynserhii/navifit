import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const ReviewsContainer = styled(Stack)(({ theme }) => ({
    marginTop: 60,
    gap: 40,
    alignItems: 'center'
}))

export default function Reviews() {

    return (
        <ReviewsContainer>
            <Stack alignItems='center'>
                <Stack direction='row' gap={1}>
                    <Typography variant='h1' color='primary'>18,400</Typography>
                    <Typography variant='h1'>osób</Typography>
                </Stack>
                <Typography variant='regular16'>już wybrało NAVIFIT</Typography>
            </Stack>
            <Box sx={{ minHeight: 180 }}>
                reviews block
            </Box>
        </ReviewsContainer>
    );
}