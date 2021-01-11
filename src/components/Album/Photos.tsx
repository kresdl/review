import { discardPhoto } from "lib/editor/tools"
import React, { CSSProperties } from "react"
import { Transition, TransitionGroup } from "react-transition-group"
import { TransitionStatus } from "react-transition-group/Transition"
import { Photo } from "types"
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

type Props = {
    album: string,
    photos: Photo[]
}

const Photos: React.FC<Props> = ({ album, photos }) => (
    <div className="d-flex flex-wrap">
        <TransitionGroup>
            {
                photos.map(({ name, url }) => (
                    <Transition key={name} timeout={TRANSITION_DUR}>
                        {
                            state => <Thumbnail mb="0.8rem" mr="0.8rem" key={name} url={url} style={states[state]} onClick={() => discardPhoto(name, album)} />
                        }
                    </Transition>
                ))
            }
        </TransitionGroup>
    </div>
)

export default Photos