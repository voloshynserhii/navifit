import { useState } from 'react'
import { HStack, Stack, VStack, Text } from 'native-base'
import { StyleSheet } from 'react-native';
import AppLoader from './AppLoader'
import Reviews from '../Reviews'
import EmailForm from './EmailForm'

export default function Loader({ loading, onSendEmail }) {
    const [showEmailForm, setShowEmailForm] = useState(false);
    
    const onFinishLoad = () => setShowEmailForm(true)
    
    return (
        <Stack style={styles.container}>
            {showEmailForm ? <EmailForm loading={loading} onSendEmail={onSendEmail} /> : (
                <VStack alignItems='center' justifyContent='center' w='100%' pt={20} pb={30}>
                    <AppLoader onFinishLoad={onFinishLoad} />
                    <Stack style={styles.textContainer}>
                        <Text style={styles.text}>Przygotowanie spersonalizowanego planu posiłków</Text>
                    </Stack>
                    <VStack>
                        <HStack style={{ gap: 5 }}>
                            <Text style={styles.advNumber} color='primary.main'>18,400</Text>
                            <Text style={styles.advText}>people</Text>
                        </HStack>
                        <Text style={styles.text}>have already chosen NAVIFIT</Text>
                    </VStack>
                    <Reviews />
                </VStack>
            )}

        </Stack>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F7',
        // backgroundColor: 'white',
        borderRadius: 30,
        marginHorizontal: 8,
        paddingVertical: 35,
        paddingHorizontal: 12
    },
    textContainer: {
        textAlign: 'center',
        paddingHorizontal: 20,
        marginVertical: 10
    },
    text: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        textAlign: 'center',
        lineHeight: 24
    },
    advNumber: {
        fontSize: 40,
        fontFamily: 'Poppins_700Bold',
        lineHeight: 60
    },
    advText: {
        fontSize: 40,
        fontFamily: 'Poppins_600SemiBold',
        lineHeight: 60
    }
})