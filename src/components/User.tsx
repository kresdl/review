import React from 'react'
import Sidebar from './Sidebar'
import styled from '@emotion/styled'
import { Route } from 'react-router-dom'
import AlbumEditor from './AlbumEditor'

const Wrapper = styled.div`
  @media screen and (min-width: 768px) {
    height: 100vh;
  }
`

const User: React.FC = () => {
  return (
    <>
      <Route path="/user">
        <Wrapper className="row no-gutters">
          <header className="col-md-auto">
            <Sidebar />
          </header>
          <main className="col-md pt-5 px-3">
            <Route path="/user/albums">
              <AlbumEditor />
            </Route>
          </main>
        </Wrapper>
      </Route>
    </>
  )
}

export default User