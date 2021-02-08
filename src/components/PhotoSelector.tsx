import React, { useRef } from "react"
import styled from "@emotion/styled"
import store from "lib/store"
import { observer } from "mobx-react-lite"
import { useHistory, useRouteMatch, Route } from "react-router-dom"
import { HasId } from "types"
import LightBox from './LightBox'
import ImageButton from "./ImageButton"
import { acceptPhotos } from "lib/db"
import auth, { getUser } from "lib/auth"
import { useAlbumChange } from "lib/hooks"
import PhotoSequence from "./PhotoSequence"
import svg from "images/check.svg"

const Wrapper = styled.div`
    @media screen and (min-width: 768px) {
        height: 100vh;
    }
`

const H1 = styled.h1`
    text-align: center;
    font-size: 2rem;
    margin-bottom: 3rem;
`

const PhotoSelector: React.FC = () => {
    const array = useRef<string[]>([])
    const history = useHistory()
    const albumId = useRouteMatch<HasId>('/guest/:id')!.params.id

    useAlbumChange(albumId,
        album => store.setIndex({ [albumId]: album }),
        [albumId]
    )

    const photos = store.index[albumId]?.photos
    if (!photos) return null

    const onToggle = (name: string, active: boolean) => {
        const arr = array.current
        if (active) arr.push(name)
        else arr.splice(arr.indexOf(name), 1)
    }

    const accept = async () => {
        const album = store.index[albumId]
        const selected = album.photos.filter(p => array.current.includes(p.name))

        try {
            await acceptPhotos(getUser().email!, selected, album.user)
            alert('Tack!')
            store.reset()
            await auth.signOut()
            history.push('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Wrapper>
            <Route exact path="/guest/:id/:photo">
                <LightBox />
            </Route>
            <main className="pt-5 px-3">
                <H1>Vilka bilder vill du framkalla?</H1>
                <PhotoSequence albumId={albumId} onToggle={onToggle} />
                <div className="text-center">
                    <ImageButton url={svg} imageSize={50} onClick={accept} />
                </div>
            </main>
        </Wrapper>
    )
}

export default observer(PhotoSelector)