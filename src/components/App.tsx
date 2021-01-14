import React from 'react'
import User from './User'
import Splash from './Splash'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { observer } from 'mobx-react-lite'
import Guest from './Guest'
import { Role } from 'types'
import store from 'lib/store'
import { getUserFromStorage } from 'lib/util'
import useAuthChange from 'lib/hooks/use-auth-change'

const queryClient = new QueryClient()

const elements: Record<Role | 'default', React.ReactElement> = {
    guest: <Guest />,
    user: <User />,
    default: <Splash />,
}

const App: React.FC = () => {
    useAuthChange(
        user => {
            if (user) sessionStorage.setItem('user', JSON.stringify(user))
            else sessionStorage.removeItem('user')
            store.reset(user)
        },
        []
    )

    const user = store.user || getUserFromStorage() // Kringgår en onödig redirect

    return (
        <QueryClientProvider client={queryClient}>
            {elements[user?.role || 'default']}
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default observer(App);
