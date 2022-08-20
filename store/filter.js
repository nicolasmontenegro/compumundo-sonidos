export const state = () => ({
  isOpen: false,
  searchQuery: '',
  categoriesList: [],
  categoriesSelected: [],
  categoriesQuery: '',
  filteredDBCount: 0,
})

export const mutations = {
  toggleIsOpen(state) {
    state.isOpen = !state.isOpen
  },
  setCategoriesList(state, value) {
    state.categoriesList = value
  },
  setCategoriesSelected(state, value) {
    state.categoriesSelected = value
  },
  setCategoriesQuery(state, value) {
    state.categoriesQuery = value
  },
  setFilteredDBCount(state, value) {
    state.filteredDBCount = value
  },
  setSearchQuery(state, value) {
    state.searchQuery = value
  },
}

export const getters = {
  categoriesFiltered(state) {
    const prefilter = state.categoriesList.filter(
      (category) => !state.categoriesSelected.includes(category)
    )

    return state.categoriesQuery
      ? prefilter.filter((option) =>
          option
            .toString()
            .toLowerCase()
            .includes(state.categoriesQuery.toLowerCase())
        )
      : prefilter
  },
  categoriesNotSelected(state) {
    return state.categoriesList.filter(
      (category) => !state.categoriesSelected.includes(category)
    )
  }
}
