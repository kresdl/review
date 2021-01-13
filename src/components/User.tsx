import React from 'react'
import Sidebar from './Sidebar'
import styled from '@emotion/styled'
import AlbumEditor from './AlbumEditor'
import Album from './Album'
import LightBox from './LightBox'
import { Route } from 'react-router-dom'

const Wrapper = styled.div`
  @media screen and (min-width: 768px) {
    height: 100vh;
  }
`

const User: React.FC = () => (
  <Wrapper className="row no-gutters">
    <header className="col-md-auto">
      <Sidebar />
    </header>
    <main className="col-md pt-5 px-3">
      <Route path="/user/albums">
        <AlbumEditor />
      </Route>
      <Route path="/user/mag">
        <LightBox />
      </Route>
      <Route path="/user/album/:id">
        <Album />
      </Route>
    </main>
  </Wrapper>
)

export default User