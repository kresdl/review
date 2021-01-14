import React from 'react'
import styled from '@emotion/styled'
import LightBox from './LightBox'
import { Route, useRouteMatch } from 'react-router-dom'
import { useAlbumChange } from 'lib/hooks'
import { HasId } from 'types'
import store from 'lib/store'
import Photos from './Album/Photos'

const Wrapper = styled.div`
    @media screen and (min-width: 768px) {
        height: 100vh;
    }
`

const Guest: React.FC = () => {
    const albumId = useRouteMatch<HasId>('/album/:id')!.params.id

    useAlbumChange(albumId,
        album => store.setIndex({ [albumId]: album }),
        []
    )
    
    return (
        <Wrapper>
            <main className="pt-5 px-3">
                <Route exact path="/album/:id/:photo">
                    <LightBox />
                </Route>
                <Route exact path="/album/:id">
                    <Photos />
                </Route>
            </main>
        </Wrapper>
    )
}

export default Guest