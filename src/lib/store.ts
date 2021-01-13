import { action, observable, makeObservable } from 'mobx';
import { Index, Tasks } from 'types';
class Store {
    constructor() {
        makeObservable(this)
    }

    @observable
    tasks: Tasks = {}

    @observable
    index?: Index | null

    @observable
    uid?: string | null

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