import store from 'lib/store'
import { byTitle } from 'lib/util'
import { observer } from 'mobx-react-lite'
import React from 'react'
import AlbumRecord from './AlbumRecord'
import Collapsable from './Collapsable'

const Albums: React.FC = () => {
    if (!store.index) return null
    const items = Object.values(store.index).sort(byTitle)

    return (
        <Collapsable className="list-group" duration={500} items={items}>
            {
                ({ id, title }, style, ref) => (
                    <li className="list-group-item border-0 p-0" style={style} ref={ref}>
                        <AlbumRecord id={id} title={title} />
                    </li>
                )
            }
        </Collapsable>
    )
}

export default observer(Albums)