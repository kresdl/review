import { action, observable, makeObservable } from 'mobx';
import { Index, Tasks, User } from 'types';
class Store {
    constructor() {
        makeObservable(this)
    }
    
    @observable
    user?: User | null

    @observable
    tasks: Tasks = {}

    @observable
    index: Index = {}

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
    reset = (user?: User | null) => {
        this.tasks = {}
        this.user = user
        this.index = {}
    }

    @action
    setUser = (user?: User | null) => {
        this.user = user
    }

    @action
    setIndex = async (index: Index) => {
        this.index = index
    }

    @action
    notify = (msg?: string | Error | null) => {
        this.message = (msg as Error)?.message || msg as string | null
    }
}

export default new Store();