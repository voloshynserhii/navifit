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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [userMessage, setUserMessage] = useState()

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
    setLoading(true)
    
    api.user.signUp(process.env.NEXT_PUBLIC_DB_HOST, { email, password, type }).then(({ user, message }) => {
      if (message) {
        setError(message)
      } else if (user) {
        authenticate(user, type)
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

  return (
    <main>
      <AuthForm loading={loading} currentUser={currentUser} error={error} message={userMessage} onSubmit={handleAuthorize} onChangePassword={handleChangePassword} onRestorePassword={handleRestorePassword} />
    </main>
  );
}