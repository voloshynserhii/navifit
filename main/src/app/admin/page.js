'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Tabs, Tab } from '@mui/material'
import AuthForm from '../../components/AuthForm'
import Table from './components/Table'
import { useAppStore } from '../../store'
import api from '../../utils/api'

export default function Admin() {
    const router = useRouter()
    const [state, dispatch] = useAppStore()
    const [error, setError] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        dispatch({ type: 'ADMIN_MODE_ON' })
    }, [])

    const adminOffHandler = () => {
        dispatch({ type: 'ADMIN_MODE_OFF' })
        router.push('/')
    }

    const handleAuthorize = ({ email, password }) => {
        setIsLoggedIn(true)
        // api.user.signUp(process.env.NEXT_PUBLIC_DB_HOST, { email, password, isAdmin: true }).then(({ user, message }) => {
        //     if (message) {
        //         setError(message)
        //     } else {
        //         localStorageSet('adminUser', JSON.stringify(user))
        //         // dispatch({ type })
        //         // router.push('/account/plan')
        //     }
        // }).catch((err) => console.log(err))
    }

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (!isLoggedIn) return (
        <main>
            <div style={{ height: 'var(--header-height)' }} />
            <AuthForm error={error} onSubmit={handleAuthorize} />
            <Button>Create Admin User</Button>
            <Button onClick={adminOffHandler}>Admin Mode Off</Button>
        </main>
    );

    return (
        <main>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Tab label="Users" />
                <Tab label="Dishes" />
                <Tab label="Plans" />
                <Tab label="Promocodes" />
            </Tabs>
            {value === 0 && <Table />}
        </main>
    )
}