import React from 'react'
import { Album } from 'types'
import AlbumRecord from './AlbumRecord'
import Collapsable from './Collapsable'

type Props = {
  items?: Album[]
  disabled?: boolean
  select?: boolean
}

const Albums: React.FC<Props> = ({ items, disabled, select }) =>
  <Collapsable className="list-group" duration={500} items={items}>
    {
      (item, style, ref) => {
        const props = {
          className: `list-group-item ${select ? 'list-group-item-action' : ''} border-0 p-0 ${disabled ? 'disabled' : ''}`,
          style, ref
        }

        return (
          <li {...props}>
            <AlbumRecord {...item} />
          </li>
        )
      }
    }
  </Collapsable>

export default Albums