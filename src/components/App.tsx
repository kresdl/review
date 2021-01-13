import React, { useEffect } from 'react'
import User from './User'
import Splash from './Splash'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Switch, Route } from 'react-router-dom'
import store from 'lib/store'
import { observer } from 'mobx-react-lite'
import auth from 'lib/auth'
import { subscribe } from 'lib/db'

const queryClient = new QueryClient()

const App: React.FC = () => {

    useEffect(() => {
        let unsubscribe: () => void

        auth.onAuthStateChanged(user => {
            store.setUser(user?.uid)
            unsubscribe && unsubscribe()

            if (!store.uid)
                store.setIndex(null)
            else
                unsubscribe = subscribe(store.setIndex)
        })

        if (auth.isSignInWithEmailLink(window.location.href)) {
            const email = window.prompt('Ange din email-adress för verifikation');
            if (!email) return

            auth.signInWithEmailLink(email, window.location.href)
                .then(console.log)
                .catch(alert);
        }
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            <Switch>
                {
                    store.uid &&
                    <Route path="/user">
                        <User />
                    </Route>
                }
                <Route exact path={['/', '/register']}>
                    <Splash />
                </Route>
            </Switch>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default observer(App);
