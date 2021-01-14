import styled from "@emotion/styled"
import store from "lib/store"
import { observer } from "mobx-react-lite"
import React, { useRef } from "react"
import { useHistory, useParams } from "react-router-dom"
import { HasId } from "types"
import CustomLink from "./CustomLink"
import ImageButton from "./ImageButton"
import Thumbnail from "./Thumbnail"
import Toggle from "./Toggle"
import svg from "images/check.svg"
import { acceptPhotos } from "lib/db"
import auth, { getUser } from "lib/auth"

const StyledToggle = styled(Toggle)`
    position: absolute;
    width: 30px;
    height: 30px;
    bottom: -10px;
    right: -10px;
    background-color: white;
    border: 1px solid black;
    z-index: 1;
    border-radius: 3px;
    background-image: none;
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
`

const H1 = styled.h1`
    text-align: center;
    font-size: 2rem;
    margin-bottom: 3rem;
`

const PhotoSelector: React.FC = () => {
    const { id } = useParams<HasId>()
    const array = useRef<string[]>([])
    const history = useHistory()
    const photos = store.index[id]?.photos
    if (!photos) return null

    const  toggle = (name: string, add: boolean) => {
        const arr = array.current
        if (add) arr.push(name)
        else arr.splice(arr.indexOf(name), 1)
    }

    const accept = async () => {
        const album = store.index[id]
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
        <div>
            <H1>Vilka bilder vill du framkalla?</H1>
            <div className="d-flex flex-wrap mb-5">
                {
                    photos.map(({ name, url }) => (
                        <div className="mb-4 mr-4 position-relative" key={name} >
                            <CustomLink to={`/guest/${id}/${name}`}>
                                <Thumbnail url={url} />
                            </CustomLink>
                            <StyledToggle activeStyle={{ backgroundImage: `url(${svg})` }} onToggle={state => toggle(name, state)} />
                        </div>
                    ))
                }
            </div>
            <div className="text-center">
                <ImageButton url={svg} imageSize={50} onClick={accept}/>
            </div>
        </div>
    )
}

export default observer(PhotoSelector)