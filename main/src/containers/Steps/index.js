import { useState } from 'react'
import { Container, Stack } from '@mui/material'
import Progress from './components/Progress'
import Button from './components/Button'

const totalSteps = 20

const Steps = ({ onGetBack }) => {
    const [step, setStep] = useState(1);

    const stepBackHandler = () => {
        if (step === 1) return onGetBack();
        setStep(state => state - 1);
    }

    const stepAheadHandler = () => {
        setStep(state => state + 1);
    }

    return (
        <Container>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Button title='Powrot' onClick={stepBackHandler} />
                <Button title={`${step} / ${totalSteps}`} noIcon />
            </Stack>

            <Progress progress={(step / totalSteps) * 100} />

            <Stack alignItems='center' justifyContent='center' sx={{ marginTop: 8 }}>
                <Button type='primary' title='Dalej' onClick={stepAheadHandler} />
            </Stack>
        </Container>
    )
}

export default Steps;