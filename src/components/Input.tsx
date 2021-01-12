import React from 'react'
import { Extend } from 'types'

type Props = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  invalid?: boolean,
  label: string
}

export const Input: React.FC<Props & Extend<HTMLInputElement>> = ({ children, label, invalid = false, className, ...rest }) => {
  const props = {
    className: 'form-control flex-grow-1 ' + (invalid ? 'is-invalid ' : '') + className,
    id: rest.id || label.toLocaleLowerCase().replace(' ', '-'),
    ...rest
  }

  return (
    <div className="form-group">
      <label htmlFor={props.id}>{label}</label>
      <div className="form-inline align-items-center">
        <input {...props} />
        {children}
      </div>
    </div>
  )
}

export default Input