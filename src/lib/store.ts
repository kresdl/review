import firebase from 'firebase/app'
import { action, observable, makeObservable } from 'mobx';
import { Index, Role, Tasks, User } from 'types';
class Store {
    constructor() {
        makeObservable(this)
    }
    
    @observable
    user?: User | null

    @observable
    tasks: Tasks = {}

    @observable
    index?: Index | null

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
    setUser = (user?: User | null) => {
        this.user = user
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