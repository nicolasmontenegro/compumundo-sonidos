<template lang="pug">
  section.pt-3
    FilterSounds
    ListButtons(:sounds="filteredDB")
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'IndexPage',
  async asyncData({ params, $axios, store }) {
    const dbJson = await $axios.$get(`/db.json`)
    store.commit('filter/setCategoriesList', dbJson.categories)
    return { dbJson }
  },
  data() {
    return {
      filteredDB: [],
    }
  },
  computed: {
    ...mapState('filter', [
      'searchQuery',
      'categoriesSelected',
      'categoriesQuery',
    ]),
  },
  watch: {
    categoriesSelected: {
      immediate: true,
      handler: 'updateFilteredDB',
    },
    searchQuery: {
      immediate: true,
      handler: 'updateFilteredDB',
    },
  },
  methods: {
    updateFilteredDB() {
      let filteredDBCount = 0

      this.filteredDB = this.dbJson.sounds.map((sound) => {
        sound.visible =
          sound.title.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          (this.categoriesSelected.length
            ? sound.categories
              ? sound.categories.some((category) =>
                  this.categoriesSelected.includes(category)
                )
              : false
            : true)
        if (sound.visible) filteredDBCount += 1
        return sound
      })

      return this.$store.commit('filter/setFilteredDBCount', filteredDBCount)
    },
  },
}
</script>
