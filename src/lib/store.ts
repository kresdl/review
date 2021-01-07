import { action, observable, makeObservable } from 'mobx';
class Store {
    constructor() {
        makeObservable(this)
        this.notify = this.notify.bind(this)
    }

    @action
    notify(msg?: string | Error | null) {
        this.message = (msg as Error)?.message || msg as string | null
    }

    @observable
    message?: string | null
}

export default new Store();