import React from 'react'
import AlbumRecord from './AlbumRecord'
import Collapsable from './Collapsable'

const toIndexed = (title: string) =>
    ({ id: title, title })

type Props = {
  items?: string[]
  disabled?: boolean
  select?: boolean
}

const Albums: React.FC<Props> = ({ items, disabled, select }) =>
  <Collapsable className="list-group" duration={500} items={items?.map(toIndexed)}>
    {
      ({ title }, style, ref) => {
        const props = {
          className: `list-group-item ${select ? 'list-group-item-action' : ''} border-0 p-0 ${disabled ? 'disabled' : ''}`,
          style, ref
        }

        return (
          <li {...props}>
            <AlbumRecord title={title} />
          </li>
        )
      }
    }
  </Collapsable>

export default Albums