import { useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '@/firebase/config'
import AppView from '@/components/AppView';
import { useAppStore } from '@/store';
import AuthForm from '@/components/AuthForm';
import api from '@/utils/api';

const provider = new GoogleAuthProvider()

export default function SignUpPage() {
  const router = useRouter()
  const [state, dispatch] = useAppStore()
  const { currentUser = {} } = state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>()
  const [userMessage, setUserMessage] = useState<string>()

  const authenticate = (user: { _id: string, email: string }) => {
    dispatch({ type: 'LOG_IN' })
    dispatch({
      type: 'CURRENT_USER',
      payload: user,
    });
    router.push(`/plan/${user._id}`)
  }

  const authWithGoogle = (email: string) => {
    setLoading(true)

    api.user.logIn({ email, isGoogleLogin: true }).then(({ user, message }) => {
      if (message) {
        setError(message)
      } else if (user) {
        authenticate(user)
      }
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }
  
  const handleAuthorize = ({ email, password, confirmPassword }) => {
    setLoading(true)

    api.user.signUp({ email, password, confirmPassword }).then(({ user, message }) => {
      if (message) {
        setError(message)
      } else if (user) {
        dispatch({ type: 'LOG_IN' })
        dispatch({
          type: 'CURRENT_USER',
          payload: user,
        });
        
        router.push('/')
      }
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }

  const handleGoogleLogin = async () => {

  }


  return (
    <AppView>
      <AuthForm
        title='Zarejestruj się'
        subTitle='Wpisz adres e-mail, na który jesteś zarejestrowana 
        w aplikacji NAVIFIT'
        agreeText='Zakładając konto wyrażasz zgodę na nasze Warunki korzystania z usługi,
        Polityka prywatności'
        signup
        // loading={loading}
        currentUser={currentUser}
        error={error}
        onSubmit={handleAuthorize}
        onGoogleLogin={handleGoogleLogin}
        onClearError={() => setError(null)}
      />
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
