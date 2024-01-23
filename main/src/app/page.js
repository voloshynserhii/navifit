'use client'
import { useState } from 'react'
import Main from '../containers/Main'
import Steps from '../containers/Steps'
import styles from './page.module.css'

export default function Home() {
  const [optionChosen, setOptionChosen] = useState()

  return (
    <main className={styles.main}>
      {!optionChosen ? (
        <Main onChooseOption={(opt) => setOptionChosen(opt)} />
      ) : (
        <Steps option={optionChosen} onGetBack={() => setOptionChosen(undefined)} />
      )}
    </main>
  )
}
