import { StyleSheet } from 'react-native';
import { HStack, VStack, Text } from 'native-base'

export default function InfoMessage({ icon, text, showWarning }) {
    const isError = showWarning?.isWarning
    const isSuccess = showWarning?.isOk
    
    return (
        <VStack style={styles.container} space={4} borderColor={isError ? 'primary.redLighten1' : isSuccess ? 'primary.greenLighten1' : 'transparent'}>
            <HStack style={styles.subContainer} alignItems='center' space={4}>
                {icon || showWarning?.icon}
                <Text style={styles.title}>{text || showWarning.title}</Text>
            </HStack>
            {showWarning && <Text>{showWarning.text}</Text>}
        </VStack>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'rgb(245, 245, 247)',
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: 'solid',
    },
    subContainer: {
        width: '100%',
    },
    title: {
        flex: 1, 
        flexWrap: 'wrap',
        fontFamily: 'Poppins_500Regular',
        fontWeight: 500,
        fontSize: 16,
    },
    text: {
        flex: 1, 
        flexWrap: 'wrap',
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
    }
});