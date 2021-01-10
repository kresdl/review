import { action, observable, makeObservable, computed } from 'mobx';
import { Album, Photo } from 'types';
class Store {
    constructor() {
        makeObservable(this)
    }

    @observable
    busy?: boolean

    @observable
    progress?: number | null

    @computed
    get uploading() {
        return typeof this.progress === 'number'
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
    setBusy = (value: boolean) => {
        this.busy = value
    }

    @action
    setProgress = (value: number | null) => {
        this.progress = value
    }

    @action
    setAlbums = (albums: Album[]) => {
        this.albums = albums
    }

    @action
    setAlbum = (album?: Album<Photo>) => {
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