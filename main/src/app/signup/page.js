'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useAppStore } from '../../store'
import AuthForm from '../../components/AuthForm'
import api from '../../utils/api'


export default function SignUpPage() {
  const router = useRouter()
  const [state, dispatch] = useAppStore()
  const { currentUser = {} } = state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  
  const handleAuthorize = ({ email, password, confirmPassword }) => {
    setLoading(true)
    
    api.user.signUp(process.env.NEXT_PUBLIC_DB_HOST, { email, password, confirmPassword }).then(({ user, message }) => {
      if (message) {
        setError(message)
      } else if (user) {
        dispatch({
          type: 'CURRENT_USER',
          payload: user,
        });
        // router.push(`/account/plan/${user._id}`)
        router.push('/login')
      }
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
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
        onClearError={() => setError(null)}
      />
    </main>
  );
}