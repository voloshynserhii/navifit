import { useState } from 'react'
import { Container, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import api from '../../utils/api'
import Progress from './components/Progress'
import Button from './components/Button'
import OptionCard from './components/OptionCard'
import InputNumber from './components/InputNumber'
import Loader from './components/Loader'
import { steps } from './utils'

const totalSteps = steps.length
const optionsWithNextBtn = [5, 8, 14, 15, 16, 17, 18, 19, 20]

const Steps = ({ onGetBack }) => {
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(2)
    const [answers, setAnswers] = useState({})

    const router = useRouter()

    const stepBackHandler = () => {
        if (step === 2) return onGetBack();
        setStep(state => state - 1);
    }

    const stepAheadHandler = () => {
        if (step === totalSteps - 1) {
            setLoading(true)
        } else {
            setStep(state => state + 1)
        }
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

    const finishLoadingHandler = () => {
        setLoading(false)
        router.push('/email', { scroll: false })
        // api.plans.getOptions(process.env.NEXT_PUBLIC_DB_HOST, { data: answers }).then(({ plans = [] }) => {
        //     console.log('Push')
        //     router.push('/email', { scroll: false })
        // }).catch(() => router.push('/'))
    }
    
    let btnDisabled = false

    if (steps[step - 1].value === 'desiredWeight' && !answers[steps[step - 1].value]) btnDisabled = true

    if (steps[step - 1].value === 'dimensions' && (!answers[steps[step - 1].value] || Object.values(answers[steps[step - 1].value]).length !== 3)) btnDisabled = true

    if (loading) return <Loader onFinishLoad={finishLoadingHandler}/>
    
    return (
        <Container maxWidth='sm'>

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

            {steps[step - 1]?.value && steps[step - 1].value === 'desiredWeight' && (
                <InputNumber
                    placeholder="(kg)"
                    min={steps[step - 1]?.min}
                    max={steps[step - 1]?.max}
                    onChange={val =>
                        setAnswers(prev => ({
                            ...prev,
                            [steps[step - 1].value]: val
                        }))
                    } />
            )}

            {steps[step - 1]?.value && steps[step - 1].value === 'dimensions' && (
                <Stack>
                    {steps[step - 1]?.inputTypes?.map(option => (
                        <Stack key={option.value} alignItems='center' >
                            <Typography sx={{ marginTop: 2 }} >{option.title}</Typography>
                            <InputNumber
                                min={option?.min}
                                max={option?.max}
                                placeholder={option.title}
                                onChange={val => selectOptionHandler(val, option.value)}
                            />
                        </Stack>
                    ))}
                </Stack>
            )}

            {optionsWithNextBtn.includes(step) && step <= totalSteps && <Stack alignItems='center' justifyContent='center' sx={{ marginTop: 8 }}>
                <Button type='primary' title='Dalej' disabled={btnDisabled} onClick={stepAheadHandler} />
            </Stack>}

        </Container>
    )
}

export default Steps;