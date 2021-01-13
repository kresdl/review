import React from 'react'
import User from './User'
import Splash from './Splash'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Switch, Route } from 'react-router-dom'
import store from 'lib/store'
import { observer } from 'mobx-react-lite'

const queryClient = new QueryClient()

const App: React.FC = () => (
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

export default observer(App);
