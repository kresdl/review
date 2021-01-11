import React, { HTMLAttributes } from 'react'
import styled from '@emotion/styled'
import { space, SpaceProps } from 'styled-system'

type Props = {
    value: number
}

const ProgressBar: React.FC<Props & HTMLAttributes<HTMLDivElement>> = ({ value, className, ...rest }) => {
    const prog = 100 * value
    const innerStyle = { width: prog + '%' }

    return (
        <div className="form-group progress my-0 flex-grow-1" {...rest}>
          <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={innerStyle} aria-valuenow={prog} aria-valuemin={0} aria-valuemax={100} />
        </div>
    )
}

export default styled(ProgressBar)<SpaceProps>(space)