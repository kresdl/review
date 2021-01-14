import React from 'react'
import User from './User'
import Splash from './Splash'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Route } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import Guest from './Guest'
import { Role } from 'types'
import store from 'lib/store'
import { getUserFromStorage } from 'lib/util'
import useAuthChange from 'lib/hooks/use-auth-change'

const queryClient = new QueryClient()

const guestRoute = (
    <Route exact path="/album/:id">
        <Guest />
    </Route>
)

const userRoute = (
    <Route path="/">
        <User />
    </Route>
)

const defaultRoute = (
    <Route path="/">
        <Splash />
    </Route>
)

const routes: Record<Role | 'default', React.ReactElement> = {
    guest: guestRoute,
    user: userRoute,
    default: defaultRoute,
}

const App: React.FC = () => {
    useAuthChange(
        user => {
            if (user) sessionStorage.setItem('user', JSON.stringify(user))
            else sessionStorage.removeItem('user')
            store.setUser(user)
        },
        []
    )

    const user = store.user || getUserFromStorage() // Kringgår en onödig redirect

    return (
        <QueryClientProvider client={queryClient}>
            {
                routes[user?.role || 'default']
            }
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default observer(App);
