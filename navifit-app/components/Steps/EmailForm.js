import { useState, useEffect } from 'react'
import { HStack, VStack, Stack, Alert, CircularProgress, Input, Text } from 'native-base'
// import { isEmail } from '@src/utils/functions'
import Button from '../AppButton'
// import { protection } from '../../utils/icons'

// const DemoPaper = styled(Paper)(({ theme }) => ({
//   position: 'relative',
//   display: 'flex',
//   justifyContent: 'center',
//   borderRadius: theme.spacing(4),
//   overflow: 'hidden',
//   padding: '58px 60px',
//   boxShadow: 'none',
//   marginBottom: 48,
//   [theme.breakpoints.down("md")]: {
//     padding: '56px 12px 30px',
//   },
// }))

// const EmailInput = styled(TextField)(({ theme }) => ({
//   '&.MuiTextField-root .MuiInputBase-root': {
//     borderRadius: 10
//   }
// }))

export default function EmailForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const sendEmailHandler = () => {
    const data = {
      email
    }
console.log(data)
    // setLoading(true)

    // api.user.sendAnswers(data).then(({ user, message }) => {
    //   if (!user && message) {
    //     setError(message)
    //     setLoading(false)
    //   } else {
    //     setLoading(false)

    //     dispatch({
    //       type: 'USER_DATA',
    //       payload: user,
    //     })

    //     router.push('/subscriptions', { scroll: false })
    //   }
    // }).catch(() => {
    //   setLoading(false)
    // })
  }

  return (
    //   {loading && <CircularProgress color="inherit" />}

    //   {error && <Alert sx={{ zIndex: 1301 }} variant="filled" severity="error">{error}</Alert>}

        <VStack>
          <Stack alignItems='center' justifyContent='center'>
            <Stack alignItems='center' mb={4}>
              <Text>
                Wpisz swój adres e-mail,
              </Text>
              <Text>
                aby dowiedzieć się, jak schudnąć
              </Text>
            </Stack>

            <Input label="Your email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />

            <HStack space={1} mt={1}>
              {/* {protection} */}
              <Text>
                Navifit nie sprzedaje ani nie wypożycza nikomu Twoich danych osobowych. Prześlemy Ci kopię wyników, abyś miał do nich wygodny dostęp.
              </Text>
            </HStack>
            
            <Button 
              title="Dalej" 
              type="primary" 
              sx={{ display: 'flex', width: '100%', mt: 4 }} 
            //   disabled={!isEmail(email)}
              onClick={sendEmailHandler} 
            />
          </Stack>

        </VStack>
  )
}