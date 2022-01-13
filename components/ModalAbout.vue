<template lang="pug">
.modal-about
  span.is-clickable(@click='isModalActive = true')
    b-icon.mr-2(icon='information-outline' size="is-small")
    span.is-hidden-desktop Acerca de 
  b-modal(v-model='isModalActive')
    .modal-card(style='width: auto')
      header.modal-card-head
        p.modal-card-title 
          b-icon.mr-2(icon='information-outline')
          | Acerca de 
      section.modal-card-body
        .columns
          .column.is-4.is-offset-1.is-flex.is-flex-direction-column.is-align-items-center
            figure.image.is-128x128.mb-2
              img.is-rounded(src="/logo_compumundo.png", alt="Logo de CompumundoHiperMegaRed")
            p.m-2.has-text-centered
              | Botonera de la 
              a(href="https://compumun.do" target="_blank") CompumundoHiperMegaRed
          .column.is-4.is-offset-2.is-flex.is-flex-direction-column.is-align-items-center
            figure.image.is-128x128.mb-2
              img.is-rounded(src="/logo_chocochips.png", alt="Logo de NicoChocoChips")
            p.m-2.has-text-centered
              | Desarrollada por 
              a(href="https://chocochipslab.com" target="_blank") NicoChocoChips
        

</template>

<script>
export default {
  name: 'ModalAbout',
  data() {
    return {
      isModalActive: false
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/_all"

.modal-about ::v-deep
  p, label
    color: $black
  img
    max-height: initial
</style>
