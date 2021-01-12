import store from "lib/store"
import { discardPhoto } from "lib/tools"
import { observer } from "mobx-react-lite"
import React, { CSSProperties } from "react"
import { Link, useParams } from "react-router-dom"
import { Transition, TransitionGroup } from "react-transition-group"
import { TransitionStatus } from "react-transition-group/Transition"
import Thumbnail from "./Thumbnail"

export const TRANSITION_DUR = 250

const states: Partial<Record<TransitionStatus, CSSProperties>> = {
    entering: {
        opacity: 1,
        transform: 'scale(0)',
        pointerEvents: 'none'
    },
    entered: {
        transform: 'scale(1)',
        opacity: 1,
        transitionProperty: 'transform opacity',
        transitionDuration: TRANSITION_DUR + 'ms'
    },
    exiting: {
        opacity: 0,
        transition: `opacity ${TRANSITION_DUR}ms`,
        pointerEvents: 'none'
    }
}

type Params = {
    id: string
}

type Props = {
    deleteMode: boolean
}

const Photos: React.FC<Props> = ({ deleteMode }) => {
    const { id } = useParams<Params>()
    const photos = store.index?.[id].photos
    if (!photos) return null

    const link = (name: string, evt: React.SyntheticEvent) => {
        if (deleteMode) {
            evt.preventDefault()
            evt.stopPropagation()
            discardPhoto(name, id)
        }
    }

    return (
        <div className="d-flex flex-wrap">
            <TransitionGroup>
                {
                    photos.map(({ name, url }) => (
                        <Transition key={name} timeout={TRANSITION_DUR}>
                            {
                                state => (
                                    <Link to={{ pathname: '/user/mag', state: url }} onClick={link.bind(0, name)}>
                                        <Thumbnail mb="1.5rem" mr="1.5rem" key={name} url={url} style={states[state]} />
                                    </Link>
                                )
                            }
                        </Transition>
                    ))
                }
            </TransitionGroup>
        </div>
    )
}

export default observer(Photos)