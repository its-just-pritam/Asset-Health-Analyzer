import { action, observable } from 'mobx'
export default class GlobalStore {
    @observable
    public sideBarCollapsed = false

    @observable
    public darkMode: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches

    @action
    toggleSideBar(state: boolean) {
        this.sideBarCollapsed = state
    }

    @action
    toggleDarkMode(state: boolean) {
        this.darkMode = state
    }

}