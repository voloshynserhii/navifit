import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { onAuthStateChanged } from "firebase/auth";
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { auth } from '@/firebase/config'
import AppView from '@/components/AppView';
import { useAppStore } from '@/store'
import AuthForm from '@/components/AuthForm'
import api from '@/utils/api'

export default function LogInPage() {
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
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authWithGoogle(user.email)
      }
    });
  }, [])
  
  useEffect(() => {
    if (auth.currentUser) {
      authWithGoogle(auth.currentUser.email)
    }
  }, [auth.currentUser])

  const handleAuthorize = ({ email, password }: { email: string, password: string }) => {
    setLoading(true)

    api.user.logIn({ email, password }).then(({ user, message }) => {
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

  const handleChangePassword = ({ email, oldPassword, newPassword }: { email: string, oldPassword: string, newPassword: string }) => {
    setLoading(true)

    api.user.update({ email, oldPassword, password: newPassword }).then(({ currentUser, message }) => {
      if (message) {
        setError(message)
      } else if (currentUser) {
        authenticate(currentUser)
      }

      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }

  const handleRestorePassword = ({ email }: { email: string}) => {
    setLoading(true)

    api.user.restorePassword({ email }).then(({ message }) => {
      if (message) {
        setError(message)
      } else {
        setUserMessage('Instructions with setting a new password were sent. Please check your email to continue!')
      }

      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }

  const handleGetConfirmedUser = async (id: string) => {
    api.user.getUser({ id }).then(({ message, user }) => {
      if (message) {
        setError(message)
      } else {
        dispatch({
          type: 'CURRENT_USER',
          payload: user,
        });
      }

      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }

  const handleGoogleLogin = async () => {
    // await GoogleSignin.hasPlayServices();
    // const userInfo = await GoogleSignin.signIn();

    authWithGoogle(currentUser.email)

  }

  return (
    <AppView>
      <AuthForm
        title='Zaloguj się'
        subTitle='Wpisz adres e-mail, na który jesteś zarejestrowana 
        w aplikacji NAVIFIT'
        agreeText='Logowanie oznacza zgodę na nasze Warunki korzystania z usługi, 
        Polityka prywatności'
        // loading={loading}
        currentUser={currentUser}
        error={error}
        message={userMessage}
        onSubmit={handleAuthorize}
        onGoogleLogin={handleGoogleLogin}
        onChangePassword={handleChangePassword}
        onRestorePassword={handleRestorePassword}
        onClearError={() => {
          setError(null)
          setUserMessage('')
        }}
        onGetConfirmedUser={handleGetConfirmedUser}
      />
    </AppView>
  );
}
