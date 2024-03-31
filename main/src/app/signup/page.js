'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useAppStore } from '../../store'
import AuthForm from '../../components/AuthForm'
import api from '../../utils/api'
import { localStorageSet } from '../../utils/localStorage';


export default function SignUpPage() {
  const router = useRouter()
  const [state, dispatch] = useAppStore()
  const { currentUser = {} } = state
  const [error, setError] = useState()

  const handleAuthorize = ({ email, password }) => {
    const type = currentUser.email ? 'SIGN_UP' : 'LOG_IN'

    api.user.signUp(process.env.NEXT_PUBLIC_DB_HOST, { email, password, type }).then(({ user, message }) => {
      if (message) {
        setError(message)
      } else {
        localStorageSet('loggedUser', JSON.stringify(user))
        dispatch({ type })
        dispatch({
          type: 'CURRENT_USER',
          payload: user,
        });
        router.push(`/account/plan/${user._id}`)
      }
    }).catch((err) => console.log(err))
  }

  return (
    <main>
      <AuthForm currentUser={currentUser} error={error} onSubmit={handleAuthorize} />
    </main>
  );
}