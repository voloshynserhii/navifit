import { StyleSheet } from 'react-native';
import { Button, Divider, VStack, Text, HStack } from 'native-base'
import AppButton from '../AppButton'
import GoogleIcon from '@/assets/icons/google.svg'

const ChooseTypeStep = ({ login = false, onGoogleLogin, onChooseEmailType, onChangeType }) => {
    return (
        <VStack w='100%'>
            <Button
                style={styles.googleButton}
                borderColor='primary.lightGrey'
                _text={styles.googleButtonText}
                startIcon={<GoogleIcon />}
                onPress={onGoogleLogin}
            >
                {login ? 'Zaloguj przez Google' : 'Zarejestruj się przez Google'}
            </Button>

            <HStack w='100%' alignItems='center' justifyContent='center' space={2} mb={4} mt={8}>
                <Divider style={{ width: '43%' }} variant="middle" />
                <Text style={styles.lub}>lub</Text>
                <Divider style={{ width: '43%' }} variant="middle" />
            </HStack>

            <AppButton title='Kontynuuj z e-mailem' noIcon onPress={onChooseEmailType} />
        </VStack>
    )
}

const styles = StyleSheet.create({
    googleButton: {
        borderRadius: 32,
        height: 52,
        marginTop: 10,
        backgroundColor: 'white',
        borderWidth: 1,
    },
    googleButtonText: {
        fontSize: 16, 
        fontFamily: 'Poppins_500Medium', 
        color: 'primary.contrastText',
        marginLeft: 5
    }, 
    lub: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'Poppins_400Regular'
    }
});

export default ChooseTypeStep;