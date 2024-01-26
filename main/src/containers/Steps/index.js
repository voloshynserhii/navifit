import { useState } from 'react'
import { Container, Stack, Typography } from '@mui/material'
import Progress from './components/Progress'
import Button from './components/Button'
import EmailModal from './components/EmailModal'
import OptionCard from './components/OptionCard'
import { steps } from './utils'

const totalSteps = steps.length

const Steps = ({ onGetBack }) => {
    const [step, setStep] = useState(2);

    const stepBackHandler = () => {
        if (step === 2) return onGetBack();
        setStep(state => state - 1);
    }

    const stepAheadHandler = () => {
        if (step < totalSteps) setStep(state => state + 1);
    }

    return (
        <Container maxWidth='sm'>
            {step === totalSteps ? <EmailModal open={step === totalSteps} onClose={stepBackHandler} /> : (
                <>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Button title='Powrot' onClick={stepBackHandler} />
                        <Button title={`${step} / ${totalSteps}`} noIcon />
                    </Stack>

                    <Progress progress={(step / totalSteps) * 100} />

                    <Typography variant="h2" sx={{ marginBottom: 1, textAlign: 'center' }}>
                        {steps[step - 1]?.title}
                    </Typography>

                    {steps[step - 1]?.subTitle && (
                        <Typography variant="h4" sx={{ marginBottom: 1, textAlign: 'center' }}>
                            {steps[step - 1]?.subTitle}
                        </Typography>
                    )}

                    {steps[step - 1].options?.map(option => {
                        return (
                            <OptionCard key={option.title} option={option} onChooseOption={stepAheadHandler} />
                        )
                    })}

                    {step <= totalSteps && <Stack alignItems='center' justifyContent='center' sx={{ marginTop: 8 }}>
                        <Button type='primary' title='Dalej' onClick={stepAheadHandler} />
                    </Stack>}
                </>
            )}

        </Container>
    )
}

export default Steps;