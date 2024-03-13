import { Container, Grid, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Progress from '../Progress'
import styles from './index.module.css'

const DemoPaper1 = styled(Paper)(({ theme }) => console.log(theme));
const DemoPaper = styled(Paper)(({ theme }) => ({
    position: 'relative',
    minHeight: '80vh',
    borderRadius: theme.spacing(3),
    borderRadius: 30,
    cursor: 'pointer',
    overflow: 'hidden',
}));

export default function StepContainer({ question = '', description = '', totalSteps, children }) {
    return (
        <Container>
            <DemoPaper1/>
            <DemoPaper className={styles.container}>
                <Grid container >
                    <Grid item xs={12} md={6} sx={{ padding: '2rem 60px' }}>
                        <Progress step={1} totalSteps={totalSteps} />
                        
                        <Stack sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>
                            <Typography component="h1" variant='h1'>{question}</Typography>
                            <p style={{ width: '80%' }}>{description}</p>
                        </Stack>

                        <Stack sx={{ width: '40%', position: 'absolute', bottom: '10%' }}>Wybierając cel i kontynuując, wyrażasz zgodę na nasze
                            Warunki korzystania z usługi | Polityka prywatności
                        </Stack>
                    </Grid>
                    {children}
                </Grid>
            </DemoPaper>
        </Container>
    )
}