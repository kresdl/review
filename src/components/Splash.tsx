import React from 'react'
import styled from '@emotion/styled'
import store from 'lib/store'
import { observer } from 'mobx-react-lite'
import Login from './Login'
import Register from './Register'
import { Route, Switch } from 'react-router-dom'

const H1 = styled.h1`
  font-size: 4rem;
`

const Center = styled.main`
  width: 20rem;
`

const Splash: React.FC = () => (  
  <>
    <header className="jumbotron">
      <H1 className="text-center display-1 text-primary">Photo album X2000</H1>
      <p className="lead text-center">Your pixel pusher in cyberspace</p>
    </header>
    <Center className="mx-auto pt-5">
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
      {store.message && <p className="m-0">{store.message}</p>}
    </Center>
  </>
)

export default observer(Splash)