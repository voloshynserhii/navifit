import { useState } from 'react'
import { Container, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import api from '../../utils/api'
import Progress from './components/Progress'
import Button from './components/Button'
import OptionCard from './components/OptionCard'
import InputNumber from './components/InputNumber'
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
    
  // const sendDataHandler = (email) => {
  //   const data = {
  //     email,
  //     userData: answers
  //   }

  //   api.user.sendAnswers(process.env.NEXT_PUBLIC_DB_HOST, data).then(() => {
  //     router.push('/subscriptions', { scroll: false });
  //   }).catch(() => router.push('/'))
  // }
  
    const stepAheadHandler = () => {
        console.log(step, totalSteps)
        if (step === totalSteps - 1) {
            //send data to api for getting plans and then redirect to email 
            router.push('/email', { scroll: false })
        }
        
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

    let btnDisabled = false
    
    if (steps[step - 1].value === 'desiredWeight' && !answers[steps[step - 1].value]) btnDisabled = true
    
    if (steps[step - 1].value === 'dimensions' && (!answers[steps[step - 1].value] || Object.values(answers[steps[step - 1].value]).length !== 3)) btnDisabled = true

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