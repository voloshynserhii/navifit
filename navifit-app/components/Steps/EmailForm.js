import { useState } from 'react'
import { StyleSheet, Keyboard } from 'react-native'
import { Box, HStack, VStack, Stack, Input, Text } from 'native-base'
import { isEmail } from '@/utils/functions'
import ProtectionIcon from '@/assets/icons/protection.svg'
import Button from '../AppButton'


export default function EmailForm({ loading, onSendEmail }) {
  const [email, setEmail] = useState('');

  const sendEmailHandler = () => {
    Keyboard.dismiss();
    onSendEmail(email);
    setEmail('');
  }

  return (
    //   {error && <Alert sx={{ zIndex: 1301 }} variant="filled" severity="error">{error}</Alert>}

    <VStack>
      <Stack alignItems='center' mb={4} style={{ textAlign: 'center' }}>
        <Text style={styles.title} color='primary.contrastText'>
          Wpisz swój adres e-mail,
        </Text>
        <Text style={styles.title} color='primary.main'>
          aby dowiedzieć się, jak schudnąć
        </Text>
      </Stack>

      <Input
        style={{ height: 56, fontSize: 18, fontFamily: 'Poppins_400Regular', borderRadius: '10px', borderColor: '#BDBDBD' }}
        borderRadius="10"
        _focus={{ borderColor: '#BDBDBD', backgroundColor: 'white' }}
        placeholder="Your email"
        isFocused={false}
        value={email}
        onChangeText={(value) => setEmail(value)}
      />

      <HStack space={1} mt={2} style={{ paddingHorizontal: 2, width: '95%' }}>
        <ProtectionIcon />
        <Text style={styles.infoText} color='primary.contrastText'>
          Navifit nie sprzedaje ani nie wypożycza nikomu Twoich danych osobowych. Prześlemy Ci kopię wyników, abyś miał do nich wygodny dostęp.
        </Text>
      </HStack>

      <Box mt={5}>
        <Button
          title="Dalej"
          isLoading={loading}
          disabled={!isEmail(email)}
          onPress={sendEmailHandler}
        />
      </Box>

    </VStack>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 24,
    lineHeight: 36,
    textAlign: 'center'
  },
  infoText: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 18,
  }
})