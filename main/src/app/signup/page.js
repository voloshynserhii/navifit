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

  const authenticate = (user, type = 'LOG_IN') => {
    localStorageSet('loggedUser', JSON.stringify(user))
    dispatch({ type })
    dispatch({
      type: 'CURRENT_USER',
      payload: user,
    });
    router.push(`/account/plan/${user._id}`)
  }
  
  const handleAuthorize = ({ email, password }) => {
    const type = currentUser.email ? 'SIGN_UP' : 'LOG_IN'

    api.user.signUp(process.env.NEXT_PUBLIC_DB_HOST, { email, password, type }).then(({ user, message }) => {
      if (message) {
        setError(message)
      } else if (user) {
        authenticate(user, type)
      }
    }).catch((err) => console.log(err))
  }
  
  const handleResetPassword = ({ email, oldPassword, newPassword }) => {
    api.user.update(process.env.NEXT_PUBLIC_DB_HOST, { email, oldPassword, password: newPassword }).then(({ currentUser, message }) => {
      if (message) {
        setError(message)
      } else if (currentUser) {
        authenticate(currentUser)
      }
    }).catch((err) => console.log(err))
  }

  return (
    <main>
      <AuthForm currentUser={currentUser} error={error} onSubmit={handleAuthorize} onResetPassword={handleResetPassword} />
    </main>
  );
}