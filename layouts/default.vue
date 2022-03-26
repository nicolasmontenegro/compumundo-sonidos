<template lang="pug">
.layout
  template(v-if="bgStyle === 'stars'")
    canvas.bg-special#canvas
  template(v-if="bgStyle === 'tebi'")
    .bg-special#stars
    .bg-special#tebi
  template(v-if="bgStyle === 'telowide'")
    video#telowide(autoplay loop muted)
      source(src="bg/telowide.mp4")
  b-navbar.has-shadow.is-primary(:close-on-click="false")
    template(#brand)
      b-navbar-item(tag="router-link" :to="{ path: '/' }")
        img.mr-3(src="~assets/logo.png" alt="Buefy" height="28")
        p.title.is-5 Gran Botonera CompuMundo
    template(#end)
      b-navbar-item(tag="div")
        ToggleDrag
      b-navbar-item(tag="div")
        FilterButton
      b-navbar-item(tag="div")
        FullscreenButton
      b-navbar-item(tag="div")
        ModalSettings
      b-navbar-item(tag="div")
        ModalAbout
  .main-content.is-flex.is-flex-direction-column.is-justify-content-space-between
    Nuxt
    p.about.my-3.has-text-centered
      | Desarrollado por 
      a(href="https://chocochipslab.com/" target="_blank") NicoChocoChips
</template>

<script>
import { mapState } from 'vuex'
import Stars from '~/assets/stars.js'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      stars: null,
    }
  },
  computed: {
    ...mapState('settings', ['bgStyle']),
  },
  watch: {
    bgStyle() {
      this.manageStars()
    },
  },
  mounted() {
    this.manageStars()
  },
  methods: {
    manageStars() {
      if (this.bgStyle === 'stars') {
        setTimeout(() => {
          this.stars = new Stars(this.$el.querySelector('#canvas'))
        }, 50)
      } else {
        delete this.stars
      }
    },
  },
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/_all"

html
  background-color: $black
  overflow-y: auto !important

body
  max-width: 100vw
  overflow-x: hidden
</style>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/_all"

.layout ::v-deep
  .navbar
    .title
      color: $white
      overflow: hidden
      white-space: nowrap

    &-item
      @media screen and (max-width: $tablet)
        overflow-x: hidden
        flex: 1

  .bg-special
    position: fixed
    height: 100vh
    width: 100vw
    top: 0
    left: 0
    z-index: 0
    padding: 0
    margin: 0

    &.hide
      display: none

  #tebi
    background: url('/bg/baby.gif') repeat
  #stars
    background: url('/bg/stars.gif') repeat
  #telowide
    position: fixed
    height: 100vh
    width: 100vw
    overflow: hidden
    object-fit: cover

  .main-content
    min-height: calc(100vh - 52px)

    .about
      color: $grey
      position: relative
</style>
