import { StyleSheet, View, Pressable } from 'react-native';
import { Center, VStack, Heading, Text, HStack } from 'native-base';

import AppProgressBar from '@/components/AppProgressBar';
// import UserPermission from '../UserPermission'
// import InfoMessage from '../InfoMessage';
import { ThemedText } from '@/components/ThemedText';
import { DemoPaper } from '@/components/DemoPaper';

const getFormattedQuestion = (question) => {
    let words = question.split(' ').map(word => ` ${word} `)

    const foundWord = words.find(word => word.search('/%') > -1)
    const foundWords = words.filter(word => word.search('/%') > -1)

    if (foundWords.length > 1) {
        const expression = foundWords.map(word => word.replace('/%', '')).join(' ')

        let firstIndex, lastIndex

        foundWords.forEach(foundWord => {
            const i = words.findIndex((word) => word.search(foundWord) > -1)

            if (!firstIndex) firstIndex = i
            lastIndex = i
        })

        words.splice(firstIndex, lastIndex - firstIndex)
        words[firstIndex] = <ThemedText>{expression}</ThemedText>
    } else if (foundWord) {
        const i = words.findIndex(word => word.search('/%') > -1)
        const newWord = <ThemedText>{foundWord.replace('/%', '').replace(' ', '')}</ThemedText>

        words[i] = newWord
    }

    return words
}

export default function StepContainer({ currentStep = {}, step = 1, totalSteps, showWarning, children, onStepBack }) {
    const styled = currentStep?.isGraphic
    const question = currentStep?.title || ''
    const description = currentStep?.subTitle || ''
    const icon = currentStep?.icon

    return (
        <View style={styles.mainView}>
            <DemoPaper>
                <VStack>
                    <AppProgressBar step={step + 1} totalSteps={totalSteps} onStepBack={onStepBack} />
                    <VStack py={6} space={3} mb={3}>
                        <Heading style={{
                            fontFamily: 'Poppins_600Regular',
                        }}>
                            {question}
                        </Heading>
                        {description && !styled && <Text style={{
                            fontFamily: 'Poppins_400Regular',
                        }} fontSize="md" color="secondary.greyDarken2">
                            {description}
                        </Text>}
                        {/* {(showWarning || (description && styled)) && <InfoMessage icon={icon} text={description} showWarning={showWarning} />} */}
                    </VStack>
                </VStack>
                <VStack space={4}>
                    {children}
                    <Center mt={3}>
                        <Text
                            fontSize='xs'
                            style={{
                                fontFamily: 'Poppins_400Regular',
                            }}
                        >
                            Wybierając cel i kontynuując, wyrażasz zgodę na nasze
                        </Text>
                        <HStack alignItems='center'>
                            <Pressable style={styles.link}>
                                <Text style={{
                                    fontFamily: 'Poppins_400Regular',
                                }} fontSize='xs' color="#1565C0">Warunki korzystania </Text>
                            </Pressable>
                            <Text style={{
                                fontFamily: 'Poppins_400Regular',
                            }} fontSize='xs' color='secondary.brandBlack'> z usługi | </Text>
                            <Pressable style={styles.link}>
                                <Text style={{
                                    fontFamily: 'Poppins_400Regular',
                                }} fontSize='xs' color="#1565C0">Polityka prywatności</Text>
                            </Pressable>
                        </HStack>
                    </Center>
                </VStack>
            </DemoPaper>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
});