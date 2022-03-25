
<template lang="pug">
.fullscreen-button
  span.is-clickable(@click='toggleCanDrag')
    b-icon.mr-2(:icon="canDragSounds ? 'pencil' : 'pencil-outline'"  size="is-small")
    span.is-hidden-desktop Arrastrar sonidos
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ToggleDrag',
  computed: {
    ...mapState('sounds', ['canDragSounds']),
  },
  methods: {
    toggleCanDrag() {
      this.$store.commit('sounds/toggleCanDragSounds')
    },
  },
}
</script>
