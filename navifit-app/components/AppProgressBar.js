import { StyleSheet, Pressable } from 'react-native';
import { Progress, VStack, HStack, ChevronLeftIcon } from 'native-base';
import { ThemedText } from './ThemedText';

export default function AppProgressBar({ step = 1, totalSteps = 25, removeProgressBar, onStepBack }) {
    return (
        <VStack space={2}>
            <VStack>
                <Pressable style={styles.backButton} onPress={onStepBack}>
                    {step > 1 && <ChevronLeftIcon size="5" />}
                </Pressable>
                {totalSteps && !removeProgressBar && <HStack space={1} justifyContent="flex-end">
                    <ThemedText>{step}</ThemedText><ThemedText>/</ThemedText><ThemedText>{totalSteps}</ThemedText>
                </HStack>}
            </VStack>
            {totalSteps && !removeProgressBar && <Progress bg="primary.grey" _filledTrack={{ bg: "primary.main" }} value={(step / totalSteps) * 100} />}
        </VStack>
    );
}

const styles = StyleSheet.create({
    backButton: {
        height: 32,
        width: 32,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
});