<template lang="pug">
.layout
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
export default {
  name: 'DefaultLayout'
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
</style>
