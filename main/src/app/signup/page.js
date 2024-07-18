'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"

import AuthForm from '../../components/AuthForm'
import { localStorageSet } from '../../utils/localStorage';
import { useAppStore } from '../../store'
import api from '../../utils/api'
import app from '../../../firebase/config'

const provider = new GoogleAuthProvider()
const auth = getAuth(app);

export default function SignUpPage() {
  const router = useRouter()
  const [state, dispatch] = useAppStore()
  const { currentUser = {} } = state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const authenticate = (user) => {
    localStorageSet('loggedUser', JSON.stringify(user))
    dispatch({ type: 'LOG_IN' })
    dispatch({
      type: 'CURRENT_USER',
      payload: user,
    });

    router.push(`/account/plan/${user._id}`)
  }
  
  const authWithGoogle = (email) => {
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
        dispatch({
          type: 'CURRENT_USER',
          payload: user,
        });
        
        router.push('/login')
      }
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }

  const handleGoogleLogin = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        if (user) {
          authWithGoogle(user.email)
        }
      }).catch((error) => {
        console.log('ERRROR', error)
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <main>
      <AuthForm
        title='Zarejestruj się'
        subTitle='Wpisz adres e-mail, na który jesteś zarejestrowana 
        w aplikacji NAVIFIT'
        agreeText='Zakładając konto wyrażasz zgodę na nasze Warunki korzystania z usługi,
        Polityka prywatności'
        signup
        loading={loading}
        currentUser={currentUser}
        error={error}
        onSubmit={handleAuthorize}
        onGoogleLogin={handleGoogleLogin}
        onClearError={() => setError(null)}
      />
    </main>
  );
}