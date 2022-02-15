<template lang="pug">
.fullscreen-button
  span.is-clickable(@click='toggleFullscreen')
    b-icon.mr-2(:icon="isFullscreen ? 'arrow-collapse' : 'arrow-expand'" size="is-small")
    span.is-hidden-desktop Pantalla completa
</template>

<script>
export default {
  name: 'FullscreenButton',
  data() {
    return {
      isFullscreen: false,
    }
  },
  mounted() {
    window.addEventListener('fullscreenchange', (e) => {
      this.isFullscreen = document.fullscreenElement
    })
  },
  methods: {
    toggleFullscreen() {
      this.isFullscreen
        ? document.exitFullscreen()
        : document.documentElement.requestFullscreen()
    },
  },
}
</script>
