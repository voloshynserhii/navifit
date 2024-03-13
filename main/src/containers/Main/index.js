'use client'
import { Stack, Grid } from '@mui/material'
import StepContainer from '../../components/StepContainer'
import Option from '../../components/Option'
import { steps } from '../Steps/utils'

const totalSteps = steps.length
const mainStep = steps[0]

export default function Main({ onChooseOption }) {
  return (
    <StepContainer question={mainStep.title} totalSteps={totalSteps}>
      <Grid item xs={12} md={6} sx={{ padding: '2rem 60px' }}>
        <Stack
          justifyContent='center'
          sx={{ height: '70vh' }}
        >
          {mainStep.options.map(option => (
            <Option key={option.title} option={option} onSelect={(val) => onChooseOption({ [mainStep.value]: val })} />
          ))}
        </Stack>
      </Grid>
    </StepContainer>
  )
}