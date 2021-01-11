import React, { CSSProperties } from 'react'
import UploadPhotos from './UploadPhotos'
import { useRouteMatch } from 'react-router-dom'
import Thumbnail from './Thumbnail'
import { Transition, TransitionGroup } from 'react-transition-group'
import { useAlbum } from 'lib/editor/hooks'
import store from 'lib/store'
import { observer } from 'mobx-react-lite'
import { TransitionStatus } from 'react-transition-group/Transition'
import { discardPhoto } from 'lib/editor/tools'

const TRANSITION_DUR = 250

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
  album: string
}

const Album: React.FC = () => {
  const { album: albumTitle } = useRouteMatch<Params>('/user/album/:album')!.params
  const album = useAlbum(albumTitle)

  return (
    <>
      <UploadPhotos />
      <div className="d-flex flex-wrap">
        <TransitionGroup>
          {
            album?.photos.map(({ name, url }) => (
              <Transition key={name} timeout={TRANSITION_DUR}>
                {
                  state => <Thumbnail mb="0.8rem" mr="0.8rem" key={name} url={url} style={states[state]} onClick={() => discardPhoto(name, albumTitle)} />
                }
              </Transition>
            ))
          }
        </TransitionGroup>
      </div>
      {store.message && <p className="danger">{store.message}</p>}
    </>
  )
}

export default observer(Album)