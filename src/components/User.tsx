import React from 'react'
import Sidebar from './Sidebar'
import styled from '@emotion/styled'
import AlbumEditor from './AlbumEditor'
import Album from './Album/index'
import LightBox from './LightBox'
import { Route } from 'react-router-dom'
import { useIndexChange } from 'lib/hooks'
import store from 'lib/store'
import { getUserFromStorage } from 'lib/util'

const Wrapper = styled.div`
  @media screen and (min-width: 768px) {
    height: 100vh;
  }
`

const User: React.FC = () => {
    const uid = getUserFromStorage()?.uid
    useIndexChange(uid || null, store.setIndex, [uid])

    return (
        <Wrapper className="row no-gutters">
            <header className="col-md-auto">
                <Sidebar />
            </header>
            <main className="col-md pt-5 px-3">
                <Route exact path="/albums">
                    <AlbumEditor />
                </Route>
                <Route exact path="/album/:id/:photo">
                    <LightBox />
                </Route>
                <Route exact path="/album/:id">
                    <Album />
                </Route>
            </main>
        </Wrapper>
    )
}

export default User