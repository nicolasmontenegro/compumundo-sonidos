<template lang="pug">
b-collapse(animation="slide" v-model="isOpen")
  .container
    .columns.is-align-items-center.is-justify-content-flex-end.is-flex-wrap-wrap
      .column.is-1-tablet.is-2-desktop.is-1-widescreen.counter.is-narrow.is-flex.is-flex-direction-column.is-align-items-flex-start
        p.title.is-1.m-0.mr-2 {{ filteredDBCount }}
        p.title.is-5.m-0 sonido{{ filteredDBCount == 1 ? '' : 's'}}
      .column.is-11-tablet.is-4-desktop.is-3-widescreen
        b-field(label="Filtro" horizontal)
          b-input(
            placeholder="Buscar"
            icon="magnify"
            icon-right="close-circle"
            type="search"
            icon-right-clickable
            v-model="searchQuery"
            @icon-right-click="searchQuery = ''"
            :disabled="canDragSounds")
      .column.is-11-tablet.is-6-desktop.is-8-widescreen
        b-field(label="Categorías" horizontal).is-align-items-center
          b-taglist
            b-tag.is-clickable.mt-0.mb-1.mx-1(type="is-primary" v-for="category in categoriesSelected" :key="`${category}-selected`" @click="eventClose(category)" @close="eventClose(category)" closable) {{ category }} 
            b-tag.is-clickable.mt-0.mb-1.mx-1(type="is-info" v-for="category in categoriesNotSelected" :key="`${category}-list`" @click="eventClick(category)") {{ category }} 
      //- .column.is-3
      //-   b-field(label="Categorías")
      //-     b-taginput.is-rounded(
      //-       placeholder="Categorías"
      //-       icon="label"
      //-       autocomplete
      //-       :open-on-focus="true"
      //-       v-model="categoriesSelected"
      //-       :data="categoriesFiltered"
      //-       :ellipsis="true"
      //-       @typing="setCategoriesQuery"
      //-       :disabled="canDragSounds") 
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'FilterSounds',
  computed: {
    // categoriesSelected: {
    //   get() {
    //     return this.$store.state.filter.categoriesSelected
    //   },
    //   set(newValue) {
    //     return this.$store.commit('filter/setCategoriesSelected', newValue)
    //   },
    // },
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
      'categoriesSelected',
      'filteredDBCount',
    ]),
    ...mapGetters({ categoriesNotSelected: 'filter/categoriesNotSelected' }),
    ...mapState('sounds', ['canDragSounds'])
  },
  methods: {
    setCategoriesQuery(text) {
      this.$store.commit('filter/setCategoriesQuery', text)
    },
    eventClick(newValue) {
      // eslint-disable-next-line no-console
      console.log(newValue);
      this.$store.commit('filter/setCategoriesSelected', [...this.categoriesSelected, newValue]);
    },
    eventClose(newValue) {
      this.$store.commit('filter/setCategoriesSelected', this.categoriesSelected.reduce((previousValue, currentValue) => currentValue !== newValue ? [...previousValue, currentValue] : previousValue, [] ));
    }
  },
}
</script>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/_all"

.counter
  * 
    white-space: nowrap

  @media screen and (max-width: $tablet)
    flex-direction: row !important

    *
      font-size: 1.75rem
      line-height: 100%
</style>