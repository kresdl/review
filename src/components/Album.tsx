import React from 'react'
import UploadPhotos from './UploadPhotos'
import { useRouteMatch } from 'react-router-dom'
import { del } from 'lib/storage'
import { removePhotoFromAlbum } from 'lib/db'
import Thumbnail from './Thumbnail'
import { Transition, TransitionGroup } from 'react-transition-group'
import useAlbum from 'lib/hooks/use-album'
import store from 'lib/store'

const TRANSITION_DUR = 250

const states = {
  entering: { transform: 'scale(0)', transition: `transform ${TRANSITION_DUR}ms` },
  entered: { transform: 'scale(1)', transition: `transform ${TRANSITION_DUR}ms` },
  exiting: {},
  exited: {},
  unmounted: {},
}

type Params = {
  album: string
}

const Album: React.FC = () => {
  const { album: title } = useRouteMatch<Params>('/user/album/:album')!.params
  const album = useAlbum(store.uid!, title)

  const deletePhoto = async (name: string) => {
    const old = store.album!

    store.setAlbum({
      ...old,
      photos: old.photos.filter(photo => photo.name !== name)
    })

    try {
      const count = await removePhotoFromAlbum(title, name)
      if (!count) await del(name)

    } catch (err) {
        store.setAlbum(old)
        store.notify(err)
    }
  }

  return (
    <>
      <UploadPhotos />
      <div className="d-flex flex-wrap">
        <TransitionGroup>
          {
            album?.photos.map(({ name, url }) => (
              <Transition key={name} timeout={TRANSITION_DUR}>
                {
                  state => <Thumbnail mb="0.8rem" mr="0.8rem" key={name} url={url} style={states[state]} onClick={() => deletePhoto(name)} />
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

export default Album