import { useState } from 'react'
import { Container, Stack, Typography } from '@mui/material'
import Progress from './components/Progress'
import Button from './components/Button'
import { steps } from './utils'

const totalSteps = steps.length

const Steps = ({ onGetBack }) => {
    const [step, setStep] = useState(1);

    const stepBackHandler = () => {
        if (step === 1) return onGetBack();
        setStep(state => state - 1);
    }

    const stepAheadHandler = () => {
        if (step < totalSteps) setStep(state => state + 1);
    }

    return (
        <Container>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Button title='Powrot' onClick={stepBackHandler} />
                <Button title={`${step} / ${totalSteps + 1}`} noIcon />
            </Stack>

            <Progress progress={(step / totalSteps) * 100} />

            <Typography variant="h2">
                {steps[step - 1]?.title}
            </Typography>

            {steps[step - 1]?.subTitle && (
                <Typography variant="h4">
                    {steps[step - 1]?.subTitle}
                </Typography>
            )}

            {step <= totalSteps && <Stack alignItems='center' justifyContent='center' sx={{ marginTop: 8 }}>
                <Button type='primary' title='Dalej' onClick={stepAheadHandler} />
            </Stack>}
        </Container>
    )
}

export default Steps;