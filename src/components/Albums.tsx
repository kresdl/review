import store from 'lib/store'
import { observer } from 'mobx-react-lite'
import React from 'react'
import AlbumRecord from './AlbumRecord'
import Collapsable from './Collapsable'

const Albums: React.FC = () => {
  if (!store.index) return null
  const items = Object.values(store.index)

  return (
    <Collapsable className="list-group" duration={500} items={items}>
      {
        ({ id }, style, ref) => (
          <li className="list-group-item border-0 p-0" style={style} ref={ref}>
            <AlbumRecord id={id} />
          </li>
        )
      }
    </Collapsable>
  )
}

export default observer(Albums)