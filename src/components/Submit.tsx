import React from 'react'
import { Extend } from 'types'

type Props = {
  children: string
}

const Submit: React.FC<Props & Omit<Extend<HTMLButtonElement>, 'type'>> = ({ children, ...rest }) =>
  <div className="form-group">
    <button className="btn btn-primary" type="submit" {...rest}>{children}</button>
  </div>

export default Submit