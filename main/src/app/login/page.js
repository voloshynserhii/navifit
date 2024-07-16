'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { getAuth, onAuthStateChanged, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from "firebase/auth"
import { useAppStore } from '../../store'
import AuthForm from '../../components/AuthForm'
import api from '../../utils/api'
import { localStorageSet } from '../../utils/localStorage';
import app from '../../../firebase/config'

const provider = new GoogleAuthProvider()
const auth = getAuth(app);


export default function SignUpPage() {
  const router = useRouter()
  const [state, dispatch] = useAppStore()
  const { currentUser = {} } = state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [userMessage, setUserMessage] = useState()

  const authenticate = (user) => {
    localStorageSet('loggedUser', JSON.stringify(user))
    dispatch({ type: 'LOG_IN' })
    dispatch({
      type: 'CURRENT_USER',
      payload: user,
    });
    router.push(`/account/plan/${user._id}`)
  }

  const handleAuthorize = ({ email, password }) => {
    setLoading(true)

    api.user.logIn(process.env.NEXT_PUBLIC_DB_HOST, { email, password }).then(({ user, message }) => {
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

  const handleChangePassword = ({ email, oldPassword, newPassword }) => {
    setLoading(true)

    api.user.update(process.env.NEXT_PUBLIC_DB_HOST, { email, oldPassword, password: newPassword }).then(({ currentUser, message }) => {
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

  const handleRestorePassword = ({ email }) => {
    setLoading(true)

    api.user.restorePassword(process.env.NEXT_PUBLIC_DB_HOST, { email }).then(({ message }) => {
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

  const handleGetConfirmedUser = async (id) => {
    api.user.getUser(process.env.NEXT_PUBLIC_DB_HOST, { id }).then(({ message, user }) => {
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

  const handleGoogleLogin = () => {
    signInWithRedirect(auth, provider)
  }

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        console.log('RESULT', result)
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log("CREDENTIAL", credential)
        const token = credential.accessToken;
        
        // The signed-in user info.
        // const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        console.log('ERROR', error)
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("CREDENTIAL", credential)
        // ...
      });
  }, [])


  return (
    <main>
      <AuthForm
        title='Zaloguj się'
        subTitle='Wpisz adres e-mail, na który jesteś zarejestrowana 
        w aplikacji NAVIFIT'
        agreeText='Logowanie oznacza zgodę na nasze Warunki korzystania z usługi, 
        Polityka prywatności'
        loading={loading}
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
    </main>
  );
}