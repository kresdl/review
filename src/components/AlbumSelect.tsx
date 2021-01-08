import React from 'react'
import { Album } from 'types'

type Props = {
  albums?: Album[]
  onChange: (id: number) => unknown,
  selected?: number,
  disabled?: boolean
}

const AlbumSelect: React.FC<Props> = ({ albums, onChange, selected, disabled }) => {
  const change: React.ChangeEventHandler<HTMLSelectElement> = e => {
    e.preventDefault()
    onChange(+e.target.value)
  }

  return (
    <select className={`custom-select ${disabled}`} defaultValue={selected} onChange={change} disabled={disabled}>
      {
        albums?.map(({ title }) =>
          <option key={title} value={title}>{title}</option>
        )
      }
    </select>
  )
}

export default AlbumSelect