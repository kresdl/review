import React from 'react'
import UploadAlbum from './UploadAlbum'
import Albums from './Albums'
import store from 'lib/store'
import { observer } from 'mobx-react-lite'

const AlbumEditor: React.FC = () => (
    <div className="row">
        <div className="col-lg-6">
            <h5 className="mb-4">Create album</h5>
            <UploadAlbum />
        </div>
        <div className="col-lg-6 pt-5 pt-lg-0">
            <h5 className="mb-4">Albums</h5>
            <Albums />
            {store.message && <p className="text-danger">{store.message}</p>}
        </div>
    </div>
)

export default observer(AlbumEditor)