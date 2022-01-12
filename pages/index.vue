<template lang="pug">
  section.section
    .columns.mb-6
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
            v-model="search"
            @icon-right-click="search = ''")
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
            @typing="setCategoriesQuery")
    .columns.is-flex-wrap-wrap
      .column.is-2.item-sound(v-for="sound in filteredDB" :class="{'is-visible': sound.visible}")
        AudioButton(v-bind="sound")
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ params, $axios }) {
    const dbJson = await $axios.$get(`/db.json`)
    return { dbJson }
  },
  data() {
    return {
      search: '',
      categoriesSelected: [],
      categoriesQuery: '',
      filteredDB: [],
      filteredDBCount: 0,
    }
  },
  computed: {
    categoriesFiltered() {
      const prefilter = this.dbJson.categories.filter(
        (category) => !this.categoriesSelected.includes(category)
      )

      return this.categoriesQuery
        ? prefilter.filter((option) =>
            option
              .toString()
              .toLowerCase()
              .includes(this.categoriesQuery.toLowerCase())
          )
        : prefilter
    },
  },
  watch: {
    categoriesSelected: {
      immediate: true,
      handler: 'updateFilteredDB',
    },
    search: {
      immediate: true,
      handler: 'updateFilteredDB',
    },
  },
  methods: {
    setCategoriesQuery(text) {
      this.categoriesQuery = text
    },
    updateFilteredDB() {
      this.filteredDBCount = 0

      this.filteredDB = this.dbJson.sounds.map((sound) => {
        sound.visible =
          sound.title.toLowerCase().includes(this.search.toLowerCase()) &&
          (this.categoriesSelected.length
            ? sound.categories
              ? sound.categories.some((category) =>
                  this.categoriesSelected.includes(category)
                )
              : false
            : true)
        if (sound.visible) this.filteredDBCount += 1
        return sound
      })
    },
  },
}
</script>

<style lang="sass" scoped>
.section
  .item-sound
    &:not(.is-visible)
      display: none
</style>
