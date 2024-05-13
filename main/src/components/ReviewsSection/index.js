// import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import styles from './index.module.css'

const ReviewsContainer = styled(Stack)(({ theme }) => ({
    marginTop: 60,
    gap: 40,
    alignItems: 'center',
    [theme.breakpoints.down("md")]: {
        marginTop: 24,
    },
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
            <Box sx={{ height: 180 }}>
                <Stack alignItems='center'>
                    <Box className={styles.active}>
                        <Stack direction='row' gap={2}>
                            <Box>avatar</Box>
                            <Stack>
                                <Typography>Name Surname</Typography>
                                <Box>stars</Box>
                            </Stack>
                        </Stack>
                        <Typography>Feedback text could be really looooooooooooooooooooong Feedback text could be really looooooooooooooooooooong Feedback text could be really looooooooooooooooooooong!</Typography>
                    </Box>
                    <Box className={styles.second}>
                        {/* <Typography>Feedback text could be really looooooooooooooooooooong Feedback text could be really looooooooooooooooooooong Feedback text could be really looooooooooooooooooooong!</Typography> */}
                    </Box>
                    <Box className={styles.third}>
                        {/* <Typography>Feedback text could be really looooooooooooooooooooong Feedback text could be really looooooooooooooooooooong Feedback text could be really looooooooooooooooooooong!</Typography> */}
                    </Box>
                </Stack>
            </Box>
        </ReviewsContainer>
    );
}