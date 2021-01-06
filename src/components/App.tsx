import React, { useEffect } from 'react'
import User from './User'
import Splash from './Splash'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import auth from 'lib/auth'
import store from 'lib/store'
import firebase from 'firebase/app'

const queryClient = new QueryClient()

const App: React.FC = () => {
  const history = useHistory()

  useEffect(
    () => void auth.onAuthStateChanged(authStateChange), []
  )

  const authStateChange = (user: firebase.User | null) => {
    queryClient.clear()

    if (user) {
      store.notify(null)
      history.push('/user/albums')
    } else {
      history.push('/')
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/user">
          <User />
        </Route>
        <Route exact path={['/', '/register']}>
          <Splash />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App;
