import { action, observable, makeObservable, computed } from 'mobx';
import { Album, Index, Photo } from 'types';
import auth from './auth';
import { getUserRef } from './db';
import { inflate } from './util';
class Store {
    constructor() {
        makeObservable(this)

        auth.onAuthStateChanged(user => {
            this.uid = user?.uid

            this.firestoreUnsubscribe && this.firestoreUnsubscribe()
            if (!this.uid) return
    
            this.firestoreUnsubscribe = getUserRef(this.uid)
                .collection('albums')
                .onSnapshot(
                    async snapshot => {
                        const albums = snapshot.docs.map(doc => doc.data() as Album)
                        const index = albums.reduce<Index>(
                            (acc, e) => ({ ...acc, [e.title]: e.photos }), {}
                        )
                        this.setIndex(index)

                        if (this.album)
                            this.setAlbum(await inflate(this.album?.title, index[this.album?.title]))
                    },
                    this.notify
                )
            })
    }

    firestoreUnsubscribe?: () => void | null

    @observable
    progress?: number | null

    @computed
    get uploading() {
        return typeof this.progress === 'number'
    }

    @observable
    index: Index = {}

    @observable
    album?: Album<Photo>

    @observable
    uid?: string | null = sessionStorage.getItem('uid')
 
    @observable
    message?: string | null

    @action
    setProgress = (value: number | null) => {
        this.progress = value
    }

    @action
    setIndex = async (index: Index) => {
        this.index = index
    }

    @action
    setAlbum = (album?: Album<Photo>) => {
        this.album = album
    }

    @action
    notify = (msg?: string | Error | null) => {
        this.message = (msg as Error)?.message || msg as string | null
    }
}

export default new Store();