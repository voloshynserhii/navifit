import { useState } from 'react'
import { Container, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import api from '../../utils/api'
import Progress from './components/Progress'
import Button from './components/Button'
import EmailModal from './components/EmailModal'
import OptionCard from './components/OptionCard'
import { steps } from './utils'

const totalSteps = steps.length
const optionsWithNextBtn = [5, 8, 14, 15, 16, 17, 18, 19, 20]

const Steps = ({ onGetBack }) => {
    const [step, setStep] = useState(2)
    const [answers, setAnswers] = useState({})

    const router = useRouter()

    const stepBackHandler = () => {
        if (step === 2) return onGetBack();
        setStep(state => state - 1);
    }

    const stepAheadHandler = () => {
        if (step < totalSteps) setStep(state => state + 1);
    }

    const selectOptionHandler = (val, key) => {
        if (!key) {
            setAnswers(prev => ({
                ...prev,
                [steps[step - 1].value]: val
            }))
            stepAheadHandler();
        } else {
            setAnswers(prev => ({
                ...prev,
                [steps[step - 1].value]: { ...answers[steps[step - 1].value], [key]: val }
            }))
        }
    }

    const sendDataHandler = (email) => {
        const data = {
            email,
            userData: answers
        }

        api.user.sendAnswers(data).then(() => {           
            router.push('/order', { scroll: false });
        }).catch(() => router.push('/'))
    }

    return (
        <Container maxWidth='sm'>
            {step === totalSteps ? <EmailModal open={step === totalSteps} onClose={stepBackHandler} onGetEmail={sendDataHandler} /> : (
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
                        <Typography variant="h5" sx={{ marginBottom: 1, textAlign: 'center' }}>
                            {steps[step - 1]?.subTitle}
                        </Typography>
                    )}

                    {steps[step - 1].options?.map(option => {
                        return (
                            <OptionCard key={option.title} option={option} prevData={answers[steps[step - 1].value]} onSelect={(data) => selectOptionHandler(data)} onCheck={(val) => selectOptionHandler(val, option.value)} />
                        )
                    })}

                    {optionsWithNextBtn.includes(step) && step <= totalSteps && <Stack alignItems='center' justifyContent='center' sx={{ marginTop: 8 }}>
                        <Button type='primary' title='Dalej' onClick={stepAheadHandler} />
                    </Stack>}
                </>
            )}

        </Container>
    )
}

export default Steps;