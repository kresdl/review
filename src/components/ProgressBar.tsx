import React from 'react'

type Props = {
    progress: number
}

const ProgressBar: React.FC<Props> = ({ progress }) => {
    const prog = 100 * progress
    const style = { width: prog + '%' }

    return (
        <div className="form-group progress">
          <div className="progress-bar bg-success" role="progressbar" style={style} aria-valuenow={prog} aria-valuemin={0} aria-valuemax={100} />
        </div>
    )
}

export default ProgressBar