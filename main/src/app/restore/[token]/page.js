'use client'
import { useState } from 'react';
import { useParams } from 'next/navigation'
import AuthForm from '../../../components/AuthForm'
import api from '../../../utils/api'


export default function RestorePasswordPage() {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [userMessage, setUserMessage] = useState()
  const { token } = useParams()

  const handleChangePassword = (password) => {
    setLoading(true)

    api.user.resetPassword(process.env.NEXT_PUBLIC_DB_HOST, { token, password }).then(({ message }) => {
      if (message) {
        setError(message)
      } else {
        setUserMessage('You have successfully changed your password! Now you can login!')
      }

      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }

  return (
    <main>
      <AuthForm
        title='Zresetuj hasło'
        subTitle='Wprowadź nowe hasło do swojego konta.'
        agreeText=''
        changePassword 
        loading={loading} 
        message={userMessage} 
        onClearError={() => setUserMessage('')}
        error={error} 
        onChangePassword={handleChangePassword} 
      />
    </main>
  );
}