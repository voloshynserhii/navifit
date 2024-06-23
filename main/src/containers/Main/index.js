'use client'
import { useEffect } from 'react'
import { Stack, Grid } from '@mui/material'
import StepContainer from '../../components/StepContainer'
import Option from '../../components/Option'
import UserPermission from '../../components/UserPermission'
import { steps } from '../../utils/Plans'
const totalSteps = steps.length
const mainStep = steps[0]

export default function Main({ onChooseOption }) {

  useEffect(() => {
    document.querySelector('body').scrollTo({ top: 0, behavior: 'smooth' });
  }, [])
  
  return (
    <StepContainer currentStep={mainStep} totalSteps={totalSteps}>
      <Grid item xs={12} md={6} sx={{ padding: { xs: '2rem 14px', md: '2rem 60px' }, backgroundColor: '#FFFFFF' }}>
        <Stack
          justifyContent='center'
          sx={{ height: { md: '70vh' } }}
        >
          {mainStep.options.map(option => (
            <Option key={option.title} option={option} onSelect={(val) => onChooseOption({ [mainStep.value]: val })} />
          ))}
        </Stack>
        <Stack sx={{ display: { xs: 'block', md: 'none' }, width: '100%', marginTop: { xs: '1rem', md: '1.5rem' }, padding: {xs: 0, md: '0 5px' }, textAlign: 'center' }}>
          <UserPermission />
        </Stack>
      </Grid>
    </StepContainer>
  )
}