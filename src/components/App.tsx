import React from 'react'
import User from './User'
import Splash from './Splash'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { observer } from 'mobx-react-lite'
import PhotoSelector from './PhotoSelector'
import store from 'lib/store'
import { getUserFromStorage } from 'lib/util'
import useAuthChange from 'lib/hooks/use-auth-change'
import { useCatchGuest } from 'lib/hooks'
import { Route, Switch, useHistory } from 'react-router-dom'
import useLogout from 'lib/hooks/use-logout'

const queryClient = new QueryClient()

const App: React.FC = () => {
    useCatchGuest()
    const history = useHistory()

    useAuthChange(user => {
        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user))
            store.reset(user)
            history.push(history.location.pathname)
        } else if (store.user) {
            sessionStorage.removeItem('user')
            store.reset(null)
            history.push('/')
        }
    }, [])

    useLogout('/logout')
    const user = store.user || getUserFromStorage() // Kringgå en onödig redirect

    return (
        <QueryClientProvider client={queryClient}>
            {user ? (
                <Switch>
                    <Route path="/guest"><PhotoSelector /></Route>
                    <Route path="/"><User /></Route>
                </Switch>
            ) : (
                    <Splash />
                )
            }
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default observer(App);
