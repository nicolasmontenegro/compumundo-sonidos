<template lang="pug">
  section.pt-3
    FilterSounds
    .list-buttons.pt-6(:class="{'container': !isWide}")
      .columns.is-flex-wrap-wrap.is-mobile
        .column.item-sound(
          v-for="sound in filteredDB" 
          :class="{'is-visible': sound.visible, 'is-6-mobile is-4-tablet is-2-desktop': !isWide, 'is-6-mobile is-2-tablet is-2-desktop is-1-widescreen': isWide}")
          AudioButton(v-bind="sound")
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
    ...mapState('settings', ['isWide']),
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

<style lang="sass" scoped>
.list-buttons
  position: relative

  .item-sound
    &:not(.is-visible)
      display: none
</style>
