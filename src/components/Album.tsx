import React from 'react'
import { useQuery } from 'react-query'
import UploadPhoto from './UploadPhoto'
import { useRouteMatch } from 'react-router-dom'
import { get } from 'lib/storage'
import { getAlbum } from 'lib/db'
import Thumbnail from './Thumbnail'
import { Transition, TransitionGroup } from 'react-transition-group'
import { Photo } from 'types'

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

  const photos = useQuery<Photo[], Error>(['albums', album], async () => {
    const { photos } = await getAlbum(album)
    const data = await Promise.all(photos.map(get))
    return data
  })

  return (
    <>
      <UploadPhoto />
      <div className="d-flex flex-wrap">
        <TransitionGroup key={!!photos.data?.length && 'data' || ''}>
          {
            photos.data?.map(({ name, url }) => (
              <Transition key={name} timeout={TRANSITION_DUR}>
                {
                  state => <Thumbnail mb="0.8rem" mr="0.8rem" key={name} url={url} style={states[state]} />
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