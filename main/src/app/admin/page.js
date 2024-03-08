'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Stack, Tabs, Tab } from '@mui/material'
import AuthForm from '../../components/AuthForm'
import RecipesTable from './components/Recipes'
import UsersTable from './components/Users'
import { useAppStore } from '../../store'
import api from '../../utils/api'

export default function Admin() {
    const router = useRouter()
    const [state, dispatch] = useAppStore()
    const [error, setError] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [value, setValue] = useState(0);
    const [data, setData] = useState([])

    const getUsers = async () => {
        const { data: newData } = await api.admin.getUsers(process.env.NEXT_PUBLIC_DB_HOST, { limit: 10 })
        setData(newData)
    }
    
    useEffect(() => {
        dispatch({ type: 'ADMIN_MODE_ON' })
        getUsers()
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

    const handleChange = async (event, newValue) => {
        setValue(newValue);
        setData([]);

        if (newValue === 0) {
            const { data: newData } = await api.admin.getUsers(process.env.NEXT_PUBLIC_DB_HOST, { limit: 10 })
            setData(newData)
        }
        
        if (newValue === 1) {
            const { data: newData } = await api.admin.getRecipes(process.env.NEXT_PUBLIC_DB_HOST, { limit: 10 })
            setData(newData)
        }
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
            <Stack sx={{ width: '100%', gap: 2, alignItems: 'center', padding: 10 }}>
                <Stack direction='row' sx={{ width: '100%', justifyContent: 'end', gap: 5 }}>
                    <Button variant='outlined' onClick={() => { }}>Create New</Button>
                    <Button variant='contained' onClick={() => setIsLoggedIn(false)}>Log Out</Button>
                </Stack>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Users" />
                    <Tab label="Recipes" />
                    <Tab label="Plans" />
                    <Tab label="Promocodes" />
                </Tabs>
                {value === 0 && <UsersTable data={data} />}
                {value === 1 && <RecipesTable data={data} />}
            </Stack>
        </main>
    )
}