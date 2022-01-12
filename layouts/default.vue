<template lang="pug">
.layout
  script(src="stars.js")
  template
    canvas.bg-special#canvas(:class="{hide: !(bgStyle === 'stars')}")
  template
    .bg-special#stars(:class="{hide: !(bgStyle === 'tebi')}")
    .bg-special#tebi(:class="{hide: !(bgStyle === 'tebi')}")
  b-navbar.has-shadow.is-primary
    template(#brand)
      b-navbar-item(tag="router-link" :to="{ path: '/' }")
        img.mr-3(src="~assets/logo.png" alt="Buefy" height="28")
        p.title.is-5 Gran Botonera CompuMundo
    template(#end)
      b-navbar-item(tag="div")
        ModalSettings
  section.main-content.columns
    .container.column.is-10
      Nuxt
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DefaultLayout',
  computed: {
    ...mapState('settings', ['bgStyle']),
  },
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/_all"

html
  background-color: $black
</style>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/_all"

.layout ::v-deep
  .navbar
    .title
      color: $white

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
    background: url('/baby.gif') repeat
  #stars
    background: url('/stars.gif') repeat
</style>
