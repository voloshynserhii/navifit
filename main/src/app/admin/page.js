'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Stack, Tabs, Tab } from '@mui/material'
import AuthForm from '../../components/AuthForm'
import RecipesTable from './components/Recipes'
import UsersTable from './components/Users'
import PlansTable from './components/Plans'
import RecipeForm from './components/Forms/Recipe'
import UserForm from './components/Forms/User'
import PlanForm from './components/Forms/Plan'
import { useAppStore } from '../../store'
import api from '../../utils/api'
import { localStorageGet, localStorageSet } from '../../utils/localStorage';

export default function Admin() {
    const router = useRouter()
    const [state, dispatch] = useAppStore()
    const [error, setError] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [value, setValue] = useState(0);
    const [data, setData] = useState(null)
    const [createMode, setCreateMode] = useState(false)

    const getUsers = async () => {
        const { data: newData } = await api.admin.getUsers(process.env.NEXT_PUBLIC_DB_HOST, { limit: 10 })
        setData(newData)
    }

    useEffect(() => {
        dispatch({ type: 'ADMIN_MODE_ON' })
        
        dispatch({ 
            type: 'CURRENT_USER',
            payload: undefined,
         })

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
        setCreateMode(false)
        setValue(newValue)
        setData(null)

        if (newValue === 0) {
            const { data: newData } = await api.admin.getUsers(process.env.NEXT_PUBLIC_DB_HOST, { limit: 10 })
            setData(newData)
        }

        if (newValue === 1) {
            const { data: newData } = await api.admin.getRecipes(process.env.NEXT_PUBLIC_DB_HOST, { limit: 10 })
            setData(newData)
        }
        
        if (newValue === 2) {
            const { data: newData } = await api.plan.getPlans(process.env.NEXT_PUBLIC_DB_HOST, { limit: 10 })
            setData(newData)
        }
    };
    
    const handleCreateUser = (newRecipe) => {
        api.admin.createRecipe(process.env.NEXT_PUBLIC_DB_HOST, newRecipe).then(({ user }) => {
            setData(prev => ([...prev, user]))
            setCreateMode(false)
          }).catch(err => console.log(err))
    }
    
    const handleCreateRecipe = (newRecipe) => {
        api.admin.createRecipe(process.env.NEXT_PUBLIC_DB_HOST, newRecipe).then(({ recipe }) => {
            setData(prev => ([...prev, recipe]))
            setCreateMode(false)
          }).catch(err => console.log(err))
    }
    
    const handleCreatePlan = (newPlan) => {
        api.plan.createPlan(process.env.NEXT_PUBLIC_DB_HOST, newPlan).then(({ plan }) => {
            setData(prev => ([...prev, plan]))
            setCreateMode(false)
          }).catch(err => console.log(err))
    }

    if (createMode) return (
        <main>
            <Stack sx={{ padding: 5 }}>
                {value === 0 && <UserForm onCancel={() => setCreateMode(false)} onCreate={handleCreateUser} />}
                {value === 1 && <RecipeForm onCancel={() => setCreateMode(false)} onCreate={handleCreateRecipe} />}
                {value === 2 && <PlanForm onCancel={() => setCreateMode(false)} onCreate={handleCreatePlan} onUpdate={(newPlan) => console.log(newPlan)} />}
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
                    <Tab label="Subscriptions" />
                    <Tab label="Promocodes" />
                </Tabs>
                {value === 0 && <UsersTable data={data} />}
                {value === 1 && <RecipesTable data={data} />}
                {value === 2 && <PlansTable data={data} />}
            </Stack>
        </main>
    )
}