'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'
import AuthForm from '../../components/AuthForm'
import { useAppStore } from '../../store'

export default function Admin() {
    const router = useRouter()
    const [state, dispatch] = useAppStore()

    useEffect(() => {
        dispatch({ type: 'ADMIN_MODE_ON' })
    }, [])

    const adminOffHandler = () => {
        dispatch({ type: 'ADMIN_MODE_OFF' })
        router.push('/')
    }

    return (
        <main>
            <AuthForm />
            <Button onClick={adminOffHandler}>Admin Mode Off</Button>
        </main>
    );
}