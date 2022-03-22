export const state = () => ({
    sounds: [],
    soundsFiltered: [],
    soundsOrder: [],
})

export const mutations = {
  setSounds(state, value) {
    state.sounds = value
  },
  setSoundsFiltered(state, value) {
    state.soundsFiltered = value
  },
}


export const actions = {
  applyFilter({ state, dispatch, commit, getters, rootState, rootGetters }) {
    let filteredDBCount = 0

    const soundsFilteredDB = state.sounds.map((sound) => {
      sound.visible =
        sound.title.toLowerCase().includes(rootState.filter.searchQuery.toLowerCase()) &&
        (rootState.filter.categoriesSelected.length
          ? sound.categories
            ? sound.categories.some((category) =>
                rootState.filter.categoriesSelected.includes(category)
              )
            : false
          : true)
      if (sound.visible) filteredDBCount += 1
      return sound
    })

    commit('setSoundsFiltered', soundsFilteredDB)
    commit('filter/setFilteredDBCount', filteredDBCount, { root: true }) 
  },
}