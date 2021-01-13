import { action, observable, makeObservable } from 'mobx';
import { Index, Tasks } from 'types';
import auth from './auth';
import { subscribe } from './db';
class Store {
    constructor() {
        makeObservable(this)

        auth.onAuthStateChanged(user => {
            this.setUser(user?.uid)
            this.unsubscribe && this.unsubscribe()
            if (!this.uid) return this.setIndex(null)
            else this.unsubscribe = subscribe(this.setIndex)
        })
    }

    unsubscribe?: () => void | null

    @observable
    tasks: Tasks = {}

    @observable
    index?: Index | null

    @observable
    uid?= sessionStorage.getItem('uid')

    @observable
    message?: string | null

    getTaskControls = (albumId: string) =>
        action(
            (value: number | null) => {
                this.tasks = {
                    ...this.tasks,
                    [albumId]: value
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