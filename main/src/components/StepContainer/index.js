import { Container, Grid, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Progress from '../Progress'
import UserPermission from '../UserPermission'
import styles from './index.module.css'

const DemoPaper = styled(Paper)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.spacing(4),
    overflow: 'hidden',
}));

export default function StepContainer({ step = 1, question = '', description = '', totalSteps, children, onStepBack }) {
    return (
        <Container>
            <DemoPaper className={styles.container} sx={{ minHeight: { md: '60vh' } }}>
                <Grid container >
                    <Grid item xs={12} md={6} sx={{ padding: { xs: '12px 12px 0 12px', md: '2rem 60px' } }}>
                        <Progress step={step} totalSteps={totalSteps} onStepBack={onStepBack} />

                        <Stack sx={{ position: { xs: 'relative', md: 'absolute' }, top: { xs: '-24px', md: '50%' }, transform: { md: 'translateY(-50%)' }, maxWidth: { xs: '100%', md: '42%' } }}>
                            <Typography component="h1" variant='h1'>{question}</Typography>
                            {description && <Typography variant="body16" sx={{ width: '95%', marginTop: 2.5, fontSize: { xs: 12, md: 'inherit' }, lineHeight: { xs: '18px', md: 'inherit' } }}>{description}</Typography>}
                        </Stack>

                        {step === 1 && <Stack sx={{ display: { xs: 'none', md: 'block' }, width: { xs: '100%', md: '40%' }, position: { xs: 'relative', md: 'absolute' }, bottom: { xs: 0, md: '10%' } }}>
                            <UserPermission />
                        </Stack>}
                    </Grid>
                    {children}
                </Grid>
            </DemoPaper>
        </Container>
    )
}