<template lang="pug">
b-collapse(animation="slide" v-model="isOpen")
  .columns
    .container.column.is-10
      .columns
        .column.is-3.is-flex.is-align-items-end
          p.title.is-2 {{ filteredDBCount }} sonido{{ filteredDBCount == 1 ? '' : 's'}}
        .column.is-3.is-offset-3
          b-field(label="Filtro")
            b-input(
              placeholder="Buscar"
              icon="magnify"
              icon-right="close-circle"
              type="search"
              icon-right-clickable
              v-model="searchQuery"
              @icon-right-click="searchQuery = ''"
              :disabled="canDragSounds")
        .column.is-3
          b-field(label="Categorías")
            b-taginput.is-rounded(
              placeholder="Categorías"
              icon="label"
              autocomplete
              :open-on-focus="true"
              v-model="categoriesSelected"
              :data="categoriesFiltered"
              :ellipsis="true"
              @typing="setCategoriesQuery"
              :disabled="canDragSounds") 
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'FilterSounds',
  computed: {
    categoriesSelected: {
      get() {
        return this.$store.state.filter.categoriesSelected
      },
      set(newValue) {
        return this.$store.commit('filter/setCategoriesSelected', newValue)
      },
    },
    searchQuery: {
      get() {
        return this.$store.state.filter.searchQuery
      },
      set(newValue) {
        return this.$store.commit('filter/setSearchQuery', newValue)
      },
    },
    ...mapState('filter', [
      'isOpen',
      'categoriesList',
      'categoriesQuery',
      'filteredDBCount',
    ]),
    ...mapGetters({ categoriesFiltered: 'filter/categoriesFiltered' }),
    ...mapState('sounds', ['canDragSounds'])
  },
  methods: {
    setCategoriesQuery(text) {
      this.$store.commit('filter/setCategoriesQuery', text)
    },
  },
}
</script>
