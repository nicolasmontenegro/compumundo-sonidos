<template lang="pug">
  section.pt-3
    FilterSounds
    ListButtons(:sounds="soundsFiltered")
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'IndexPage',
  async asyncData({ params, $axios, store }) {
    const dbJson = await $axios.$get(`/db.json`)
    store.commit('filter/setCategoriesList', dbJson.categories)
    store.commit('sounds/setSounds', dbJson.sounds)
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
    ...mapState('sounds', ['soundsFiltered']),
  },
  watch: {
    categoriesSelected: {
      immediate: true,
      handler: 'applyFilter',
    },
    searchQuery: {
      immediate: true,
      handler: 'applyFilter',
    },
  },
  methods: {
    ...mapActions('sounds', ['applyFilter']),
  },
}
</script>
