import { Container, Grid, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Progress from '../Progress'

const DemoPaper = styled(Paper)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.spacing(4),
    overflow: 'hidden',
}));

export default function InfoStep({ currentStep, step = 1, totalSteps, showWarning, children, onStepBack }) {

    return (
        <Container>
            <DemoPaper sx={{ minHeight: { md: '60vh' } }}>
                <Grid container >
                    <Grid item xs={12} md={6} sx={{ padding: { xs: '12px 12px 0 12px', md: '1.5rem 60px' } }}>
                        <Progress step={step} totalSteps={totalSteps} onStepBack={onStepBack} />
                    </Grid>
                    <Stack sx={{ width: '100%'}} justifyContent='center'>
                        <Typography
                            component="h2"
                            variant='h2'
                            sx={{ margin: 'auto' }}
                        >
                            Twój profil dobrego samopoczucia
                        </Typography>
                    </Stack>
                </Grid>
            </DemoPaper>
        </Container>
    )
}