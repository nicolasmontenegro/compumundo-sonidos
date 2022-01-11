<template lang="pug">
  section.section
    .columns.mb-5
      .column.is-3.is-offset-6
        b-field(label="Filtro")
          b-input(
            placeholder="Buscar"
            icon="magnify"
            type="search"
            v-model="search")
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
    .columns
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
      search: "",
      categoriesSelected: [],
      categoriesQuery: ""
    }
  },
  computed: {
    categoriesFiltered() {
      const prefilter = this.dbJson.categories.filter(category => !this.categoriesSelected.includes(category))

      return this.categoriesQuery ? prefilter.filter(option => 
        option.toString().toLowerCase().includes(this.categoriesQuery.toLowerCase())) : prefilter
    },

    filteredDB() {
      return this.dbJson.sounds.map(sound => {
        sound.visible = sound.title.toLowerCase().includes(this.search.toLowerCase()) &&
        (this.categoriesSelected.length ? sound.categories.some(category => this.categoriesSelected.includes(category)) : true)

        return sound
      })
    }
  },
  methods: {
    setCategoriesQuery(text) {
      this.categoriesQuery = text;
    },
  }
}
</script>

<style lang="sass" scoped>
.section
  .item-sound
    &:not(.is-visible)
      display: none
</style>