import React from 'react'
import styled from '@emotion/styled'
import { space, SpaceProps } from 'styled-system'
import { Stylable } from 'types'

type Props = {
    value: number
}

const ProgressBar: React.FC<Props & Stylable> = ({ value, className }) => {
    const prog = 100 * value
    const style = { width: prog + '%' }

    return (
        <div className={'form-group progress my-0 ' + className}>
          <div className="progress-bar progress-bar-striped progress-bar-animated bg-success bg-info" role="progressbar" style={style} aria-valuenow={prog} aria-valuemin={0} aria-valuemax={100} />
        </div>
    )
}

export default styled(ProgressBar)<SpaceProps>(space)