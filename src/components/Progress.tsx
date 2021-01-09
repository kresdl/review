import React from 'react'

type Props = {
    value: number
}

const Progress: React.FC<Props> = ({ value }) => (
    <div className="progress">
        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={1}></div>
    </div>
)

export default Progress