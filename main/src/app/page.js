'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Main from '../containers/Main'
import Steps from '../containers/Steps'
import { useAppStore } from '../store'
import { localStorageGet } from '../utils/localStorage';
import { useBackground } from '@src/hooks/event'

export default function Home() {
  useBackground()
  const router = useRouter()
  const [_, dispatch] = useAppStore()
  const [optionChosen, setOptionChosen] = useState()

  useEffect(() => {
    const user = localStorageGet('loggedUser')

    if (user) {
      dispatch({ type: 'LOG_IN' })

      dispatch({
        type: 'CURRENT_USER',
        payload: user,
      })

      router.push(`/account/plan/${user._id}`)
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
