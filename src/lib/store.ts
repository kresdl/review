import { action, observable, makeObservable } from 'mobx';

class Store {
    constructor() {
        makeObservable(this)
    }

    @action
    notify(msg: string | Error | null) {
        if (!msg) {
            this.message = [];
        } else if (typeof msg === 'string') {
            this.message = [msg]
        } else {
            this.message = [msg.message]
        }
    }

    @action
    setAuth(auth: string | null) {
        this.auth = auth
    }

    @observable
    message: string[] = []

    @observable
    auth: string | null = sessionStorage.getItem('token')
}

export default new Store();