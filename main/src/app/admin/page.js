'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Stack, Tabs, Tab } from '@mui/material'
import AuthForm from '../../components/AuthForm'
import RecipesTable from './components/Recipes'
import UsersTable from './components/Users'
import PlansTable from './components/Plans'
import RecipeForm from './components/Forms/Recipe'
import { useAppStore } from '../../store'
import api from '../../utils/api'
import { localStorageGet, localStorageSet } from '../../utils/localStorage';

export default function Admin() {
    const router = useRouter()
    const [state, dispatch] = useAppStore()
    const [error, setError] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [value, setValue] = useState(0);
    const [data, setData] = useState([])
    const [createMode, setCreateMode] = useState(false)

    const getUsers = async () => {
        const { data: newData } = await api.admin.getUsers(process.env.NEXT_PUBLIC_DB_HOST, { limit: 10 })
        setData(newData)
    }

    useEffect(() => {
        dispatch({ type: 'ADMIN_MODE_ON' })

        const admin = localStorageGet('adminUser')

        if (admin) {
            setIsLoggedIn(true)
            getUsers()
        }
    }, [])

    const adminOffHandler = () => {
        dispatch({ type: 'ADMIN_MODE_OFF' })
        router.push('/')
    }

    const handleAuthorize = ({ email, password }) => {
        api.user.signUp(process.env.NEXT_PUBLIC_DB_HOST, { email, password, isAdmin: true }).then(({ user, message }) => {
            if (message) {
                setError(message)
            } else {
                localStorageSet('adminUser', JSON.stringify(user))
                setIsLoggedIn(true)
                getUsers()
            }
        }).catch((err) => console.log(err))
    }

    const handleLogOut = () => {
        setIsLoggedIn(false)
        localStorageSet('adminUser', null)
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
    
    const handleCreateRecipe = (newRecipe) => {
        api.admin.createRecipe(process.env.NEXT_PUBLIC_DB_HOST, newRecipe).then(({ recipe }) => {
            setData(prev => ([...data, recipe]))
            setCreateMode(false)
          }).catch(err => console.log(err))
    }

    if (createMode && value === 1) return (
        <main>
            <Stack sx={{ padding: 5 }}>
                <RecipeForm onCancel={() => setCreateMode(false)} onCreate={handleCreateRecipe} />
            </Stack>
        </main>
    )

    if (!isLoggedIn) return (
        <main>
            <Stack sx={{ gap: 5, padding: 20 }}>
                <AuthForm error={error} onSubmit={handleAuthorize} />
                <Button onClick={adminOffHandler}>Admin Mode Off</Button>
            </Stack>
        </main>
    );

    return (
        <main>
            <Stack sx={{ width: '100%', gap: 2, alignItems: 'center', paddingLeft: 5, paddingRight: 5 }}>
                <Stack direction='row' sx={{ width: '100%', justifyContent: 'end', gap: 5 }}>
                    <Button variant='outlined' onClick={() => setCreateMode(true)}>Create New</Button>
                    <Button variant='contained' onClick={handleLogOut}>Log Out</Button>
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
                {value === 2 && <PlansTable data={data} />}
            </Stack>
        </main>
    )
}