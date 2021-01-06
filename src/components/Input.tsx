import React from 'react'
import { Extend } from 'types'

type Props = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  invalid?: boolean,
  label: string
}

export const Input: React.FC<Props & Extend<HTMLInputElement>> = ({ label, invalid = false, ...rest }) => {
  const props = {
    className: `form-control ${invalid ? 'is-invalid' : ''}`,
    id: rest.id || label.toLocaleLowerCase().replace(' ', '-'),
    ...rest
  }

  return (
    <div className="form-group">
      <label htmlFor={props.id}>{label}</label>
      <input {...props} />
    </div>
  )
}

export default Input