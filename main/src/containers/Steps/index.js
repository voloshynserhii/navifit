import { useState } from 'react'
import { Grid, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import Button from './components/Button'
import Loader from './components/Loader'
import DatePicker from '../../components/DatePicker'
import StepContainer from '../../components/StepContainer'
import Option from '../../components/Option'
import InputNumber from '../../components/InputNumber'

import { useAppStore } from '../../store';
import { steps, filterIngredients } from '../../utils/Plans'

const totalSteps = steps.length
const optionsWithNextBtn = [5, 8, 14, 15, 16, 17, 18, 19, 20, 21, 22]

const Steps = ({ option = {}, onGetBack }) => {
    const router = useRouter()
    
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(2)
    const [answers, setAnswers] = useState(option)
    const [inputError, setInputError] = useState(false)
    const [btnVisible, setButtonVisisble] = useState(false)

    const [, dispatch] = useAppStore();

    const currentStep = steps[step - 1]
    let list = currentStep.options || []

    if (answers['alergy'] && Object.keys(answers['alergy'])?.length && currentStep.filtered) {
        list = filterIngredients(answers['alergy'], list)
    }
    
    const stepBackHandler = () => {
        if (step === 2) return onGetBack()
        
        setStep(state => state - 1)
        setButtonVisisble(true)
    }

    const stepAheadHandler = () => {
        if (step === totalSteps) {
            setLoading(true)
        } else {
            setTimeout(
                () => {
                    setStep(state => state + 1)
                    if (Object.keys(answers).length < step) {
                        setButtonVisisble(false)
                    }
                },
                500
            );

        }
    }

    const selectOptionHandler = (val, key) => {
        if (!key) {
            setAnswers(prev => ({
                ...prev,
                [currentStep.value]: val
            }))
            stepAheadHandler();
        } else {
            const currentAnswer = answers[currentStep.value]

            if (key === 'none' && val) {
                setAnswers(prev => ({
                    ...prev,
                    [currentStep.value]: { [key]: val }
                }))
            } else {
                if (currentAnswer) delete currentAnswer['none']

                if (currentAnswer && Object.keys(currentAnswer).includes(key)) {
                    delete currentAnswer[key]

                    setAnswers(prev => ({
                        ...prev,
                        [currentStep.value]: currentAnswer
                    }))
                } else {
                    setAnswers(prev => ({
                        ...prev,
                        [currentStep.value]: { ...answers[currentStep.value], [key]: val }
                    }))
                }
            }

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

    if (currentStep.long && !answers[currentStep.value]) btnDisabled = true

    if (currentStep.typeNumber && !answers[currentStep.value]) btnDisabled = true

    if (loading) return <Loader onFinishLoad={finishLoadingHandler} />

    return (
        <Stack sx={{ width: '100%', maxWidth: 1200, position: { md: 'relative' }, paddingBottom: { xs: 8, md: 0 } }}>
            <StepContainer step={step} question={steps[step - 1].title} description={steps[step - 1]?.subTitle} totalSteps={totalSteps} onStepBack={stepBackHandler}>
                <Grid item xs={12} md={6} sx={{ padding: { xs: '2rem 14px', md: '2rem 40px 2rem 60px' }, backgroundColor: { xs: 'secondary.light' } }}>
                    <Stack
                        justifyContent='center'
                        sx={{ height: { md: '70vh' } }}
                    >
                        {currentStep.long ? (
                            <Grid container sx={{ paddingBottom: { xs: 1.5, md: 'initial' }, maxHeight: { xs: '32vh', md: 'unset' }, overflow: 'auto' }}>
                                {list.map(option => (
                                    <Option key={option.title} option={option} long prevData={answers[currentStep.value]} onSelect={(data) => selectOptionHandler(data)} onCheck={(val) => selectOptionHandler(val, option.value)} />
                                ))}
                                <Option option={{ title: 'Żadne z powyższych', value: 'none' }} long prevData={answers[currentStep.value]} onCheck={() => selectOptionHandler(true, 'none')} />
                            </Grid>) : (
                            <Stack sx={{ maxHeight: { xs: '50vh', md: 'unset' }, overflow: 'auto' }}>
                                {list.map(option => (
                                    <Option key={option.title} option={option} prevData={answers[currentStep.value]} onSelect={(data) => selectOptionHandler(data)} onCheck={(val) => selectOptionHandler(val, option.value)} />
                                ))}
                            </Stack>
                        )}

                        {currentStep?.value && currentStep.typeNumber && (
                            <InputNumber
                                value={answers[currentStep.value]}
                                currentStep={currentStep.value}
                                placeholder="(kg)"
                                min={currentStep?.min}
                                max={currentStep?.max}
                                unit={currentStep?.unit}
                                onChange={val =>
                                    setAnswers(prev => ({
                                        ...prev,
                                        [currentStep.value]: val
                                    }))
                                }
                                onError={(val) => setInputError(val)}
                            />
                        )}

                        {currentStep?.value && currentStep.typeDate && (
                            <Stack>
                                <DatePicker onGetDateValue={date => selectOptionHandler(date)} />
                            </Stack>
                        )}
                    </Stack>
                </Grid>
            </StepContainer>
            {((answers[currentStep.value] && btnVisible) || optionsWithNextBtn.includes(step)) && step <= totalSteps && !btnDisabled && !inputError && (
                <Stack
                    alignItems='center'
                    justifyContent='center'
                    sx={{ position: { xs: 'fixed', md: 'absolute' }, bottom: { xs: 40, md: 32 }, right: { xs: 0, md: 60 }, width: { xs: '100%', md: 'auto'}  }}
                >
                    <Button type='primary' title='Dalej' onClick={stepAheadHandler} />
                </Stack>
            )}
        </Stack>
    )
}

export default Steps;