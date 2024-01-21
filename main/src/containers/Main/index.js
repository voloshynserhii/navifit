'use client'
import { Container, Grid, Paper, Typography } from '@mui/material'
import styles from './index.module.css'
import { styled } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
  height: 345,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: theme.spacing(3),
  border: '1px solid rgba(255, 255, 255, 0.11)'
}));

export default function Main() {

  return (
    <Container>
      <div className={styles.title}>
        <Typography variant="h1">
          Czy chcesz schudnąć? <span className='coloredTitle'>My Fit Plan</span>
        </Typography>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <DemoPaper variant="elevation">Card Yes</DemoPaper>
        </Grid>
        <Grid item xs={6}>
          <DemoPaper variant="outlined">Car No</DemoPaper>
        </Grid>
      </Grid>
    </Container>
  )
}