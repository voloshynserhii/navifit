import { useState, useEffect } from 'react';
import { Container, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import AppLoader from '@src/components/AppLoader'
import Reviews from '@src/components/ReviewsSection'

const DemoPaper = styled(Paper)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.spacing(4),
    overflow: 'hidden',
    padding: '58px 60px',
    boxShadow: 'none',
    backgroundColor: theme.palette.secondary.light,
    marginBottom: 48
}))

export default function Loader({ onFinishLoad }) {

    const [uploadOrDownloadCount,
        setUploadOrDownloadCount] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            setUploadOrDownloadCount(
                (beforeValue) => beforeValue + 1);
        }, 70);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (uploadOrDownloadCount === 110) onFinishLoad()
    }, [uploadOrDownloadCount])

    return (
        <Container>
            <DemoPaper sx={{ minHeight: { md: '60vh' } }}>
                <Stack alignItems='center' >
                    <AppLoader onFinishLoad={onFinishLoad} />
                    <Typography variant='regular16'>Przygotowanie spersonalizowanego planu posiłków</Typography>
                    <Reviews />
                </Stack>
            </DemoPaper>
        </Container>
    );
}