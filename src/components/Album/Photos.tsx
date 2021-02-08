import store from "lib/store"
import { observer } from "mobx-react-lite"
import React from "react"
import { Route, useParams } from "react-router-dom"
import { HasId } from "types"
import PhotoSequence from "components/PhotoSequence"
import LightBox from "components/LightBox"

type Props = {
    onToggle: (name: string, active: boolean) => void
}

const Photos: React.FC<Props> = ({ onToggle }) => {
    const { id } = useParams<HasId>()
    const photos = store.index[id]?.photos
    if (!photos) return null

    return (
        <>
            <Route exact path="/album/:id/:photo">
                <LightBox />
            </Route>
            <PhotoSequence albumId={id} onToggle={onToggle} />
        </>
    )
}

export default observer(Photos)