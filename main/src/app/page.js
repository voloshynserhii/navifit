'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import Main from '../containers/Main'
import Steps from '../containers/Steps'
import { useAppStore } from '../store'
import { localStorageGet } from '../utils/localStorage';
import api from '../utils/api'
import app from '../../firebase/config'

const auth = getAuth(app);

export default function Home() {
  const router = useRouter()
  const [_, dispatch] = useAppStore()
  const [optionChosen, setOptionChosen] = useState()
  
  useEffect(() => {
    //remove on production
    api.server.wakeUp(process.env.NEXT_PUBLIC_DB_HOST)
    
    const user = localStorageGet('loggedUser')

    if (user) {
      dispatch({ type: 'LOG_IN' })

      dispatch({
        type: 'CURRENT_USER',
        payload: user,
      })

      router.push(`/account/plan/${user._id}`)
    } else {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          api.user.logIn(process.env.NEXT_PUBLIC_DB_HOST, { email: user.email, isGoogleLogin: true })
        }
      });
    }
  }, [])
  
  const onStartQuiz = (opt) => {
    setTimeout(
      () => setOptionChosen(opt),
      500
    );
  }

  return (
    <main>
      {!optionChosen ? (
        <Main onChooseOption={onStartQuiz} />
      ) : (
        <Steps option={optionChosen} onGetBack={() => setOptionChosen(undefined)} />
      )}
    </main>
  )
}
