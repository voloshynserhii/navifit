import { useEffect } from 'react'
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
    marginBottom: 48,
    [theme.breakpoints.down("md")]: {
        padding: '56px 12px 30px',
    },
}))

export default function Loader({ onFinishLoad }) {
    useEffect(() => {
        document.querySelector('body').scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
    
    return (
        <Container>
            <DemoPaper sx={{ minHeight: { md: '60vh' } }}>
                <Stack alignItems='center' >
                    <AppLoader onFinishLoad={onFinishLoad} />
                    <Stack sx={{ textAlign: 'center' }}>
                        <Typography variant='regular16'>Przygotowanie spersonalizowanego planu posiłków</Typography>
                    </Stack>
                    <Reviews />
                </Stack>
            </DemoPaper>
        </Container>
    );
}