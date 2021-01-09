import { action, observable, makeObservable } from 'mobx';
import { Album, Photo } from 'types';
class Store {
    constructor() {
        makeObservable(this)
    }

    @observable
    albums: Album[] = []

    @observable
    album?: Album<Photo>

    @observable
    uid?: string | null = sessionStorage.getItem('uid')
 
    @observable
    message?: string | null

    @action
    setAlbums = (albums: Album[]) => {
        this.albums = albums
    }

    @action
    setAlbum = (album: Album<Photo>) => {
        this.album = album
    }

    @action
    notify = (msg?: string | Error | null) => {
        this.message = (msg as Error)?.message || msg as string | null
    }

    @action
    setUser = (uid?: string | null) => {
        this.uid = uid
    }
}

export default new Store();