import { Box, VStack, HStack } from 'native-base'
import InfoMessage from '../InfoMessage'
import AnswerInfo from './AnswerInfo'
import BMI from './BMI'

const userInfo = {
    bodyType: {
        title: 'Budowa',
    },
    training: {
        title: 'Działalność',
    },
    weight: {
        title: 'Waga',
    },
    height: {
        title: 'Wysokość',
    },
}
const values = ['bodyType', 'dayType', 'training', 'weight', 'height']

export default function InfoStep({ answers = {}, steps, showWarning }) {
    const { bodyType = '1', dayType = '3', training = '2', weight = '72', height = '175' } = answers || {}
    const stepsForInfo = steps.filter(step => values.includes(step.value))

    return (
        <VStack justifyContent='center' alignItems='center' space={1}>
            <HStack style={{ flexWrap: 'wrap' }}>
                {Object.keys(userInfo).map((name, i) => {
                    let value = 'test'

                    if (name === 'bodyType') {
                        const optionStep = stepsForInfo.find(step => step.value === name)
                        value = optionStep.options.find(option => option.value === bodyType)?.title
                    } else if (name === 'training') {
                        const total = Number(dayType) + Number(training)

                        if (total < 4) {
                            value = 'Nizka'
                        } else if (total > 6) {
                            value = 'Wysoka'
                        } else {
                            value = 'Średnia'
                        }
                    } else if (name === 'weight') {
                        value = `${weight} kg`
                    } else {
                        value = `${+height / 100} m`
                    }

                    const item = {
                        name,
                        title: userInfo[name].title,
                        value
                    }

                    return (
                        <Box key={name} style={{ padding: 5, width: '50%' }}>
                            <AnswerInfo item={item} />
                        </Box>
                    )
                })}
            </HStack>
            <Box style={{ padding: 10, marginTop: 50, paddingBottom: 10 }}>
                <BMI BMI={showWarning.BMI} />
            </Box>

            <Box style={{ padding: 8 }}>
                <InfoMessage showWarning={showWarning} />
            </Box>
        </VStack>
    )
}