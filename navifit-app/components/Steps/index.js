import { useState, useEffect } from 'react'
import { Box, Stack, VStack, HStack } from 'native-base'
import { ScrollView } from 'react-native'
import { router } from 'expo-router';
import api from '@/utils/api'
import Loader from './Loader'
import DatePicker from '../DatePicker'
import InfoStep from './InfoStep'
import LastStep from './LastStep'
import InputNumber from '../InputNumber'

import StepContainer from '@/components/StepContainer';
import Option from './Option'
import Button from '../AppButton'

import { steps, filterIngredients, getWarning, getBMIInfo } from '@/assets/Plans'

const totalSteps = steps.length
const skipSteps = [4, 20, 23, 24]
const optionsWithNextBtn = [4, 7, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

const Steps = () => {
    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState({})
    const [inputError, setInputError] = useState(false)

    const currentStep = steps[step]
    let list = currentStep?.options || []

    if (answers['alergy'] && Object.keys(answers['alergy'])?.length && currentStep?.filtered) {
        list = filterIngredients(answers['alergy'], list)
    }

    useEffect(() => {
        if ((step === totalSteps - 2) && answers.weight && answers.weight === answers.desiredWeight) {
            setStep(state => state + 1)
            setLoading(true)
        }
    }, [step, answers.weight, answers.desiredWeight])

    // useEffect(() => {
    //     if (step === 18 && !list.length) setStep(state => state + 1)
    // }, [step, list])

    const stepBackHandler = () => {
        setStep(state => state !== 0 ? state - 1 : 0)
        clearTimeout()
    }

    const stepAheadHandler = () => {
        clearTimeout()
        setDisabled(true)

        if (step === totalSteps - 1) {
            setLoading(true)
        } else {
            setTimeout(
                () => {
                    setStep(state => state + 1)
                    setDisabled(false)
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

    const sendDataHandler = (email) => {
        const data = {
            email,
            userData: answers
        }

        setIsLoading(true)

        api.user.sendAnswers(data).then(({ user, message }) => {
            if (!user && message) {
                setIsLoading(false)
            } else {
                setIsLoading(false)

                // dispatch({
                //     type: 'USER_DATA',
                //     payload: user,
                // })

                router.push('/')
            }
        }).catch(() => {
            setLoading(false)
            router.push('/')
        })
    }

    let btnDisabled = false

    if (currentStep?.long && !answers[currentStep?.value]) btnDisabled = true

    if (currentStep?.typeNumber && !answers[currentStep?.value]) btnDisabled = true

    if (loading) return (<Loader loading={isLoading} onSendEmail={sendDataHandler} />)

    return (
        <StepContainer
            currentStep={currentStep}
            step={step}
            totalSteps={totalSteps}
            showWarning={getWarning(currentStep, answers)}
            removeProgressBar={step === 20}
            onStepBack={stepBackHandler}
        >
            <VStack>
                <ScrollView
                    justifyContent='center'
                >
                    {step === 20 && (
                        <InfoStep
                            step={step}
                            steps={steps}
                            answers={answers}
                            showWarning={getBMIInfo({ height: answers.height, weight: answers.weight })}
                        />
                    )}

                    {step === steps.length - 1 && <LastStep answers={answers} />}

                    {currentStep?.isGraphic && <Box height={300}>{currentStep.image}</Box>}

                    {currentStep?.long ? (
                        <HStack flexWrap='wrap' space={2}>
                            {list.map(option => (
                                <Option key={option.title} option={option} long prevData={answers[currentStep.value]} onSelect={(data) => selectOptionHandler(data)} onCheck={(val) => selectOptionHandler(val, option.value)} />
                            ))}
                            <Option option={{ title: 'Żadne z powyższych', value: 'none' }} long prevData={answers[currentStep.value]} onCheck={() => selectOptionHandler(true, 'none')} />
                        </HStack>) : (
                        <Stack>
                            {list.map(option => (
                                <Option key={option.title} option={option} prevData={answers[currentStep.value]} onSelect={(data) => selectOptionHandler(data)} onCheck={(val) => selectOptionHandler(val, option.value)} />
                            ))}
                        </Stack>
                    )}

                    {currentStep?.value && currentStep?.typeNumber && (
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

                    {currentStep?.value && currentStep?.typeDate && (
                        <Stack style={{ position: 'relative', alignItems: 'center' }}>
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
                </ScrollView>
                {step <= totalSteps && optionsWithNextBtn.includes(step) && (
                    <Button
                        type='primary'
                        title='Dalej'
                        disabled={disabled || ((btnDisabled || inputError || !answers[currentStep.value]) && !skipSteps.includes(step))}
                        onPress={stepAheadHandler}
                    />
                )}

            </VStack>
        </StepContainer>
    )
}

export default Steps;