import { useState } from 'react'
import { Grid, Stack, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import Button from './components/Button'
import InputNumber from './components/InputNumber'
import Loader from './components/Loader'
import DatePicker from '../../components/DatePicker'
import StepContainer from '../../components/StepContainer'
import Option from '../../components/Option'
import UserPermission from '../../components/UserPermission'

import { useAppStore } from '../../store';
import { steps } from './utils'

const totalSteps = steps.length
const optionsWithNextBtn = [5, 8, 14, 15, 16, 17, 18, 19, 20]

const Steps = ({ option = {}, onGetBack }) => {
    const theme = useTheme();

    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(2)
    const [answers, setAnswers] = useState(option)
    const [, dispatch] = useAppStore();

    const router = useRouter()

    const stepBackHandler = () => {
        if (step === 2) return onGetBack();
        setStep(state => state - 1);
    }

    const stepAheadHandler = () => {
        if (step === totalSteps) {
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
        dispatch({
            type: 'USER_DATA',
            payload: answers,
        });

        router.push('/email', { scroll: false })
    }

    let btnDisabled = false

    if (steps[step - 1].value === 'desiredWeight' && !answers[steps[step - 1].value]) btnDisabled = true

    if (steps[step - 1].value === 'dimensions' && (!answers[steps[step - 1].value] || Object.values(answers[steps[step - 1].value]).length !== 3)) btnDisabled = true

    if (loading) return <Loader onFinishLoad={finishLoadingHandler} />

    return (
        <StepContainer step={step} question={steps[step - 1].title} description={steps[step - 1]?.subTitle} totalSteps={totalSteps} onStepBack={stepBackHandler}>
            <Grid item xs={12} md={6} sx={{ padding: { xs: '2rem 14px', md: '2rem 60px' }, backgroundColor: { xs: theme.palette.secondary.light } }}>
                <Stack
                    justifyContent='center'
                    sx={{ height: { md: '70vh' } }}
                >
                    {steps[step - 1].options?.map(option => (
                        <Option key={option.title} option={option} onSelect={(data) => selectOptionHandler(data)} onCheck={(val) => selectOptionHandler(val, option.value)} />
                    ))}
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

                    {steps[step - 1]?.value && steps[step - 1].value === 'desiredDate' && (
                        <Stack>
                            <DatePicker onGetDateValue={date => selectOptionHandler(date)} />
                        </Stack>
                    )}

                    {optionsWithNextBtn.includes(step) && step <= totalSteps && <Stack alignItems='center' justifyContent='center' sx={{ marginTop: 8 }}>
                        <Button type='primary' title='Dalej' disabled={btnDisabled} onClick={stepAheadHandler} />
                    </Stack>}
                    <Stack sx={{ display: { xs: 'block', md: 'none' }, width: '100%', marginTop: '1.5rem', padding: '0 5px', textAlign: 'center' }}>
                        <UserPermission />
                    </Stack>
                </Stack>
            </Grid>
        </StepContainer>
    )
}

export default Steps;