import { action, observable, makeObservable, computed } from 'mobx';
import { Album, Index } from 'types';
import auth from './auth';
import { getUserRef } from './db';

type Op = {
    type: 'upload' | 'delete-album' | 'delete-photo' | 'create-album'
    data?: string
}
class Store {
    constructor() {
        makeObservable(this)

        auth.onAuthStateChanged(user => {
            this.uid = user?.uid

            this.firestoreUnsubscribe && this.firestoreUnsubscribe()
            if (!this.uid) return this.setIndex(null)
    
            this.firestoreUnsubscribe = getUserRef(this.uid)
                .collection('albums')
                .onSnapshot(
                    async snapshot => {
                        const albums = snapshot.docs.map(doc => doc.data() as Album)
                        const index = albums.reduce<Index>(
                            (acc, e) => ({ ...acc, [e.title]: e.photos }), {}
                        )
                        this.setIndex(index)
                    },
                    console.log
                )
            })
    }

    firestoreUnsubscribe?: () => void | null

    urls: Record<string, string> = {}

    @observable
    progress?: number | null

    op?: Op

    @computed
    get busy() {
        return typeof this.progress === 'number'
    }

    @observable
    index?: Index | null

    @observable
    uid? = sessionStorage.getItem('uid')
 
    @observable
    message?: string | null

    @action
    setProgress = (value: number | null) => {
        this.progress = value
    }

    @action
    setIndex = async (index: Index | null) => {
        this.index = index
    }

    @action
    notify = (msg?: string | Error | null) => {
        this.message = (msg as Error)?.message || msg as string | null
    }
}

export default new Store();