import { useState } from 'react'
import { Box, Grid, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import Loader from '../Loader'
import Button from '@src/components/AppButton'
import DatePicker from '@src/components/DatePicker'
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
                500
            );

        }
    }

    // if (currentStep.options && !list.length) setStep(state => state + 1)

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
                        <Grid item xs={12} md={6} sx={{ padding: { xs: '14px 12px 32px', md: '2rem 40px 2rem 60px' }, backgroundColor: step === 5 ? '#FFFFFF' : 'secondary.light' }}>
                            <Stack
                                justifyContent='center'
                                sx={{ minHeight: { md: '60vh' } }}
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
                                    <Stack sx={{ position: 'relative', top: '-30%' }}>
                                        <DatePicker onGetDateValue={date => selectOptionHandler(date)} />
                                    </Stack>
                                )}
                            </Stack>
                            {step <= totalSteps && (
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