import React from 'react'
import { useQuery } from 'react-query'
import UploadPhotos from './UploadPhotos'
import { useRouteMatch } from 'react-router-dom'
import { del, get } from 'lib/storage'
import { getAlbum, removePhotoFromAlbum } from 'lib/db'
import Thumbnail from './Thumbnail'
import { Transition, TransitionGroup } from 'react-transition-group'
import { Photo } from 'types'
import { useOptimistic } from 'lib/hooks'

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
  const { album } = useRouteMatch<Params>('/user/album/:album')!.params

  const discard = async (name: string) => {
    try {
      const count = await mutation.mutate(name)
      console.log(count)
      if (!count) await del(name)
    } catch (err) {
      console.log(err)
    }
  }

  const mutation = useOptimistic(
    ['albums', album], 
    {
      asyncFn: async (photo: string) =>
        removePhotoFromAlbum(album, photo),

      optimisticFn: (old: Photo[], name: string) =>
        old.filter(photo => photo.name !== name)
    }, []
  )

  const photos = useQuery<Photo[], Error>(
    ['albums', album], 
    async () => {
      const { photos } = await getAlbum(album)
      return Promise.all(photos.map(get))
    }
  )

  return (
    <>
      <UploadPhotos />
      <div className="d-flex flex-wrap">
        <TransitionGroup>
          {
            photos.data?.map(({ name, url }) => (
              <Transition key={name} timeout={TRANSITION_DUR}>
                {
                  state => <Thumbnail mb="0.8rem" mr="0.8rem" key={name} url={url} style={states[state]} onClick={() => discard(name)} />
                }
              </Transition>
            ))
          }
        </TransitionGroup>
      </div>
      {photos.error && <p className="danger">{photos.error.message}</p>}
    </>
  )
}

export default Album