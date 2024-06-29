import { useState, useEffect } from 'react'
import { Box, Grid, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import Loader from '../Loader'
import Button from '@src/components/AppButton'
import DatePicker from '@src/components/ReactDatePicker'
import StepContainer from '@src/components/StepContainer'
import InfoStep from '@src/components/InfoStep'
import LastStep from '@src/components/LastStep'
import Option from '@src/components/Option'
import InputNumber from '@src/components/InputNumber'
import Graphic from '@src/components/Icons/Graphic'

import { useAppStore } from '../../store';
import { steps, filterIngredients, getWarning, getBMIInfo } from '../../utils/Plans'

const totalSteps = steps.length
const skipSteps = [5, 20, 24, 25]
const optionsWithNextBtn = [5, 8, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]

const Steps = ({ option = {}, onGetBack }) => {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(2)
    const [answers, setAnswers] = useState(option)
    const [inputError, setInputError] = useState(false)
    const [, dispatch] = useAppStore();

    const currentStep = steps[step - 1]
    let list = currentStep.options || []

    if (answers['alergy'] && Object.keys(answers['alergy'])?.length && currentStep.filtered) {
        list = filterIngredients(answers['alergy'], list)
    }

    useEffect(() => {
        document.querySelector('body').scrollTo({ top: -75, behavior: 'smooth' });
    }, [step])
    
    useEffect(() => {
        if ((step === steps.length || step === steps.length - 1) && answers.weight === answers.desiredWeight) {
            setStep(state => state + 1)
            setLoading(true)
        }
    }, [step, answers.weight, answers.desiredWeight])

    useEffect(() => {
        if (step === 18 && !list.length) setStep(state => state + 1)
    }, [step, list])

    const stepBackHandler = () => {
        if (step === 2) return onGetBack()

        setStep(state => state - 1)
        clearTimeout()
    }

    const stepAheadHandler = () => {
        if (step === totalSteps) {
            setLoading(true)
            clearTimeout()
        } else {
            setTimeout(
                () => {
                    setStep(state => state + 1)
                },
                300
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
        <Stack sx={{ width: '100%', maxWidth: 1200, position: { md: 'relative' } }}>
            {/* <InfoStep step={step} steps={steps} answers={answers} showWarning={getBMIInfo({ height: 175, weight: 72 })} onStepBack={stepBackHandler} onStepAhead={stepAheadHandler} /> */}
            {step === 21 ? <InfoStep step={step} steps={steps} answers={answers} showWarning={getBMIInfo({ height: answers.height, weight: answers.weight })} onStepBack={stepBackHandler} onStepAhead={stepAheadHandler} /> : (
                <>
                    <StepContainer
                        currentStep={currentStep}
                        step={step}
                        totalSteps={totalSteps}
                        showWarning={getWarning(currentStep, answers)}
                        onStepBack={stepBackHandler}
                    >
                        <Grid item xs={12} md={6} sx={{ padding: { xs: '14px 12px 32px', md: '2rem 40px 2rem 60px' }, backgroundColor: '#FFFFFF' }}>
                            <Stack
                                justifyContent='center'
                                sx={{ minHeight: { md: '75vh' } }}
                            >
                                {currentStep.isGraphic && <Box sx={{ padding: { xs: 0, md: '0 35px 0 15px' } }}><Graphic /></Box>}

                                {step === steps.length && <LastStep answers={answers} />}

                                {currentStep.long ? (
                                    <Grid container sx={{ paddingBottom: { xs: 1.5, md: 'initial' } }}>
                                        {list.map(option => (
                                            <Option key={option.title} option={option} long prevData={answers[currentStep.value]} onSelect={(data) => selectOptionHandler(data)} onCheck={(val) => selectOptionHandler(val, option.value)} />
                                        ))}
                                        <Option option={{ title: 'Żadne z powyższych', value: 'none' }} long prevData={answers[currentStep.value]} onCheck={() => selectOptionHandler(true, 'none')} />
                                    </Grid>) : (
                                    <Stack>
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
                                    <Stack sx={{ position: 'relative', alignItems: 'center' }}>
                                        <DatePicker
                                            selectedValue={answers.desiredDate}
                                            onGetDateValue={date =>
                                                setAnswers(prev => ({
                                                    ...prev,
                                                    [currentStep.value]: date
                                                }))
                                            }
                                        />
                                    </Stack>
                                )}
                            </Stack>
                            {step <= totalSteps && optionsWithNextBtn.includes(step) && (
                                <Stack direction='row' justifyContent='end' sx={{ mt: 3 }}>
                                    <Button
                                        type='primary'
                                        title='Dalej'
                                        disabled={(btnDisabled || inputError || !answers[currentStep.value]) && !skipSteps.includes(step)}
                                        onClick={stepAheadHandler}
                                    />
                                </Stack>
                            )}

                        </Grid>

                    </StepContainer>
                </>
            )}
        </Stack>
    )
}

export default Steps;