'use client'
import { Stack, Grid, Typography } from '@mui/material'
import { useUserStore } from '@src/store/useUserStore'
import StepContainer from '../../components/StepContainer'
import { steps } from '../Steps/utils'

const totalSteps = steps.length

export default function Main({ onChooseOption }) {
  const { theme } = useUserStore();
console.log(theme)
  return (
    <StepContainer question='Jaki jest Twój cel?' totalSteps={totalSteps}>
      <Grid item xs={12} md={6} sx={{ padding: '2rem 60px' }}>
        <Typography onClick={onChooseOption}>Dalej</Typography>
      </Grid>
    </StepContainer>
  )
}