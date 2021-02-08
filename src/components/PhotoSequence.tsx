import React, { CSSProperties } from "react"
import CustomLink from "./CustomLink"
import StyledToggle from "./StyledToggle"
import Thumbnail from "./Thumbnail"
import store from "lib/store"
import svg from "images/check.svg"
import { Transition, TransitionGroup } from "react-transition-group"
import { TransitionStatus } from "react-transition-group/Transition"

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

type Props = {
    albumId: string
    onToggle: (name: string, active: boolean) => void
}

const PhotoSequence: React.FC<Props> = ({ albumId, onToggle }) => {
    const photos = store.index[albumId]?.photos
    if (!photos) return null

    return (
        <TransitionGroup className="d-flex flex-wrap">
            {
                photos.map(({ name, url }) => (
                    <Transition key={name} timeout={TRANSITION_DUR}>
                        {
                            state => (
                                <div className="mb-4 mr-4 position-relative" key={name} >
                                    <CustomLink to={`${albumId}/${name}`}>
                                        <Thumbnail url={url} style={states[state]} />
                                    </CustomLink>
                                    <StyledToggle activeStyle={{ backgroundImage: `url(${svg})` }} onToggle={active => onToggle(name, active)} />
                                </div>
                            )
                        }
                    </Transition>   
                ))
            }
        </TransitionGroup>
    )
}

export default PhotoSequence;