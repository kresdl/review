import { action, observable, makeObservable } from 'mobx';
import { Album, Index } from 'types';
import auth from './auth';
import { getUserRef } from './db';
class Store {
    constructor() {
        makeObservable(this)

        auth.onAuthStateChanged(user => {
            this.setUser(user?.uid)

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

    @observable
    tasks: Record<string, number | null> = {}

    @observable
    index?: Index | null

    @observable
    uid?= sessionStorage.getItem('uid')

    @observable
    message?: string | null

    getTaskControls = (album: string) =>
        action(
            (value: number | null) => {
                this.tasks = {
                    ...this.tasks,
                    [album]: value
                }
            }
        )

    @action
    setUser = (uid?: string | null) => {
        this.uid = uid
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