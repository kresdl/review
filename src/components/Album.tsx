import React, { CSSProperties } from 'react'
import UploadPhotos from './UploadPhotos'
import { useRouteMatch } from 'react-router-dom'
import { del } from 'lib/storage'
import { removePhotoFromAlbum } from 'lib/db'
import Thumbnail from './Thumbnail'
import { Transition, TransitionGroup } from 'react-transition-group'
import useAlbum from 'lib/hooks/use-album'
import store from 'lib/store'
import { observer } from 'mobx-react-lite'
import { TransitionStatus } from 'react-transition-group/Transition'
import Progress from './Progress'

const TRANSITION_DUR = 250

const states: Partial<Record<TransitionStatus, CSSProperties>> = {
  entering: {
    opacity: 1,
    transform: 'scale(0)' 
  },
  entered: { 
    transform: 'scale(1)', 
    opacity: 1,
    transitionProperty: 'transform opacity',
    transitionDuration: TRANSITION_DUR + 'ms'
  },
  exiting: { 
    opacity: 0, 
    transition: `opacity ${TRANSITION_DUR}ms` 
  }
}

type Params = {
  album: string
}

const Album: React.FC = () => {
  const { album: title } = useRouteMatch<Params>('/user/album/:album')!.params
  useAlbum(title, store.uid)
  const album = store.album

  if (!album) return null

  const deletePhoto = async (name: string) => {
    store.setAlbum({
      ...album,
      photos: album.photos.filter(photo => photo.name !== name)
    })

    try {
      const count = await removePhotoFromAlbum(title, name)
      if (!count) await del(name)

    } catch (err) {
        store.setAlbum(album)
        store.notify(err)
    }
  }

  return (
    <>
      <UploadPhotos />
      <div className="d-flex flex-wrap">
        <TransitionGroup>
          {
            album?.photos.map(({ name, url, dummy }) => (
              <Transition key={name} timeout={TRANSITION_DUR}>
                {
                  state => <Thumbnail mb="0.8rem" mr="0.8rem" key={name} url={url} style={states[state]} onClick={() => !dummy && deletePhoto(name)} />
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