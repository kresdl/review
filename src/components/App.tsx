import React from 'react'
import User from './User'
import Splash from './Splash'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { observer } from 'mobx-react-lite'
import Guest from './Guest'
import store from 'lib/store'
import { getUserFromStorage } from 'lib/util'
import useAuthChange from 'lib/hooks/use-auth-change'
import { useCatchGuest } from 'lib/hooks'
import { Route, Switch } from 'react-router-dom'

const queryClient = new QueryClient()

const authRoutes = (
    <Switch>
        <Route path="/guest"><Guest /></Route>
        <Route path="/"><User /></Route>
    </Switch>
)

const App: React.FC = () => {
    useCatchGuest()

    useAuthChange(user => {
        if (user) sessionStorage.setItem('user', JSON.stringify(user))
        else sessionStorage.removeItem('user')
        store.reset(user)
    }, []
    )

    const user = store.user || getUserFromStorage() // Kringgå en onödig redirect

    return (
        <QueryClientProvider client={queryClient}>
            {user ? authRoutes : <Splash />}
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default observer(App);
