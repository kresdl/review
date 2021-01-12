import store from 'lib/store'
import { observer } from 'mobx-react-lite'
import React from 'react'
import AlbumRecord from './AlbumRecord'
import Collapsable from './Collapsable'

type Props = {
  disabled?: boolean
  select?: boolean
}

const Albums: React.FC<Props> = ({ disabled, select }) => {
  if (!store.index) return null
  const items = Object.values(store.index)

  return (
    <Collapsable className="list-group" duration={500} items={items}>
      {
        ({ id }, style, ref) => {
          const props = {
            className: `list-group-item ${select ? 'list-group-item-action' : ''} border-0 p-0 ${disabled ? 'disabled' : ''}`,
            style, ref
          }

          return (
            <li {...props}>
              <AlbumRecord id={id} />
            </li>
          )
        }
      }
    </Collapsable>
  )
}

export default observer(Albums)