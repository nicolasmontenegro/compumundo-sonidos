import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    paths: [
      'filter',
      'settings',
      'sounds.soundsOrder'
    ]
  })(store)
}
