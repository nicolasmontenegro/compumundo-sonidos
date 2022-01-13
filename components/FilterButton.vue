<template lang="pug">
.fullscreen-button
  span.is-clickable(@click='toggleFilter')
    b-icon.mr-2(:icon="isOpen ? 'filter-menu' : 'filter-menu-outline'"  size="is-small")
    span.is-hidden-desktop Filtro
</template>


<script>
import { mapState } from 'vuex'

export default {
  name: 'FilterButton',
  computed: {
    ...mapState('filter', ['isOpen']),
  },
  methods: {
    toggleFilter() {
      this.$store.commit('filter/toggleIsOpen')
    }
  }
}
</script>