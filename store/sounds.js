export const state = () => ({
    sounds: [],
    soundsFiltered: [],
    soundsOrder: [],
    canDragSounds: false,
})

export const mutations = {
  setSounds(state, value) {
    state.sounds = value
  },
  setSoundsFiltered(state, value) {
    state.soundsFiltered = value
  },
  setSoundsOrder(state, value) {
    state.soundsOrder = value
  },
  toggleCanDragSounds(state) {
    state.canDragSounds = !state.canDragSounds
  },
}

export const getters = {
  getSoundsSorted(state) {
    return state.soundsOrder.map(i => ({
      ...state.sounds[i],
      originalPosition: i,
      visible: (state.canDragSounds ? true : state.soundsFiltered[i])
    }))
  }
}

export const actions = {
  applyFilter({ state, dispatch, commit, getters, rootState, rootGetters }) {
    let filteredDBCount = 0

    const soundsFiltered = state.sounds.map((sound) => {
      const visible =
        sound.title.toLowerCase().includes(rootState.filter.searchQuery.toLowerCase()) &&
        (rootState.filter.categoriesSelected.length
          ? sound.categories
            ? sound.categories.some((category) =>
                rootState.filter.categoriesSelected.includes(category)
              )
            : false
          : true)
      if (visible) filteredDBCount += 1
      return visible
    })

    commit('setSoundsFiltered', soundsFiltered)
    commit('filter/setFilteredDBCount', filteredDBCount, { root: true }) 
  },
  updateSoundsOrder({ state, dispatch, commit, getters, rootState, rootGetters }) {
    if (state.soundsOrder.length < state.sounds.length) {
      commit(
        'setSoundsOrder',
        state.soundsOrder.concat([...Array(state.sounds.length - state.soundsOrder.length).keys()].map(i => i + state.soundsOrder.length))
      )
    }
  },
  resetOrder({ state, dispatch, commit, getters, rootState, rootGetters }) {
    commit('setSoundsOrder', [])
    dispatch('updateSoundsOrder')
  }
}
