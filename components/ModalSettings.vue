<template lang="pug">
.modal-settings
  span.is-clickable(@click='isModalActive = true')
    b-icon.mr-2(icon='cog' size="is-small")
    span Configuracion
  b-modal(v-model='isModalActive' @after-enter="refreshDevices()")
    .modal-card(style='width: auto')
      header.modal-card-head
        p.modal-card-title 
          b-icon.mr-2(icon='cog')
          | Configuración
      section.modal-card-body
        b-tabs(:type="'is-boxed'" :animateInitially="true" :vertical="tabsVertical")
          b-tab-item(label="Estilo" icon="palette-swatch-outline")
            b-field(label='Estilo de fondo')
              b-select(v-model='bgStyle')
                option(v-for='option in bgStyles' :value='option.value' :label="option.label" :key='option.value')
            b-field(label='Estilo de botones')
              b-select(v-model='buttonType' )
                option(v-for='option in buttonTypes' :value='option.value' :label="option.label" :key='option.value')
            b-field(label='Estilo de lista de botones')
              b-select(v-model='listButtonType' )
                option(v-for='option in listButtonTypes' :value='option.value' :label="option.label" :key='option.value')
            template(v-if="listButtonType === 'list'")
              b-field(label='Cantidad de columnas para la lista')
                b-numberinput(v-model="listColumns" controls-position="compact" :min="1" :max="4")
            b-field(label='Espacio de botonera')
              b-checkbox(v-model="isWide") La botonera ocupa todo el ancho disponible
          b-tab-item(label="Comportamiento" icon="gesture-tap-button")
            b-field(label='Al hacer click nuevamente en un botón...')
              b-radio-button(v-model="clickRepeatSound" :native-value="false" type="is-primary is-light is-outlined")
                b-icon(icon="stop")
                span Detiene el audio
              b-radio-button(v-model="clickRepeatSound" :native-value="true" type="is-primary is-light is-outlined")
                b-icon(icon="repeat")
                span Reinicia el audio
            b-field(label='Al hacer click en otro botón...')
              b-radio-button(v-model="clickStopOtherSound" :native-value="false" type="is-primary is-light is-outlined")
                b-icon(icon="shuffle-disabled")
                span Reproduce ambos audios simultaneamente
              b-radio-button(v-model="clickStopOtherSound" :native-value="true" type="is-primary is-light is-outlined")
                b-icon(icon="call-merge" custom-class="mdi-rotate-90")
                span Detiene el primer audio
            b-field(label='Al hacer click fuera de botón ¿detiene el audio?')
              b-radio-button(v-model="clickOutsideStop" :native-value="false" type="is-primary is-light is-outlined" :disabled="!clickStopOtherSound")
                b-icon(icon="close")
                span No
              b-radio-button(v-model="clickOutsideStop" :native-value="true" type="is-primary is-light is-outlined" :disabled="!clickStopOtherSound")
                b-icon(icon="check")
                span Sí
          b-tab-item(label="Salida" icon="connection")
            b-field(label="Para usar la opción de salida de audio, primero debes autorizar el uso de micrófono"  v-if="!isAuth && isCompatible")
              b-button(label='Solicitar permiso' type="is-primary"  @click="refreshDevices()")
            b-field(label='Dispotivo de salida de audio')
              b-select(v-model='selectedDevice' :disabled="!isCompatible || !isAuth" expanded)
                option(v-for='option in listDevices' :value='option.deviceId' :label="option.label" :key='option.deviceId')
            p(v-if="!isCompatible")
              i Tu navegador no es compatible con esta opción  

</template>

<script>
import { mapGetters } from 'vuex'
import exportedVars from '~/assets/sass/export.sass'

export default {
  name: 'ModalSettings',
  data() {
    return {
      windowWidth: window.innerWidth,
      isModalActive: false,
      listDevices: [
        {
          deviceId: 'default',
          kind: 'audiooutput',
          label: 'Default',
          groupId: null,
        },
      ],
      isAuth: false,
    }
  },
  computed: {
    tabsVertical() {
      return this.windowWidth >= Number(exportedVars.breakpointDesktop)
    },
    isCompatible() {
      try {
        return Boolean(
          navigator.mediaDevices && navigator.mediaDevices.enumerateDevices
        )
      } catch (e) {
        return false
      }
    },
    buttonType: {
      get() {
        return this.$store.state.settings.buttonType
      },
      set(newValue) {
        return this.$store.commit('settings/setButtonType', newValue)
      },
    },
    listButtonType: {
      get() {
        return this.$store.state.settings.listButtonType
      },
      set(newValue) {
        return this.$store.commit('settings/setListButtonType', newValue)
      },
    },
    listColumns: {
      get() {
        return this.$store.state.settings.listColumns
      },
      set(newValue) {
        return this.$store.commit('settings/setListColumns', newValue)
      },
    },
    selectedDevice: {
      get() {
        return this.$store.state.settings.selectedDevice
      },
      set(newValue) {
        return this.$store.commit('settings/setSelectedDevice', newValue)
      },
    },
    bgStyle: {
      get() {
        return this.$store.state.settings.bgStyle
      },
      set(newValue) {
        return this.$store.commit('settings/setBgStyles', newValue)
      },
    },
    isWide: {
      get() {
        return this.$store.state.settings.isWide
      },
      set(newValue) {
        return this.$store.commit('settings/setIsWide', newValue)
      },
    },
    clickRepeatSound: {
      get() {
        return this.$store.state.settings.clickRepeatSound
      },
      set(newValue) {
        return this.$store.commit('settings/setClickRepeatSound', newValue)
      },
    },
    clickStopOtherSound: {
      get() {
        return this.$store.state.settings.clickStopOtherSound
      },
      set(newValue) {
        return this.$store.commit('settings/setClickStopOtherSound', newValue)
      },
    },
    clickOutsideStop: {
      get() {
        return this.$store.state.settings.clickOutsideStop
      },
      set(newValue) {
        return this.$store.commit('settings/setClickOutsideStop', newValue)
      },
    },
    ...mapGetters({
      buttonTypes: 'settings/buttonTypes',
      listButtonTypes: 'settings/listButtonTypes',
      bgStyles: 'settings/bgStyles',
    }),
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
  },
  methods: {
    refreshDevices() {
      if (this.isCompatible) {
        const constraints = { audio: true, video: false }
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(this.stopSteam)
          .then(this.gotDevices)
          .catch(this.handleError)
      }
    },
    stopSteam(stream) {
      stream.getTracks().forEach((t) => t.stop())
      return navigator.mediaDevices.enumerateDevices()
    },
    gotDevices(devices) {
      this.listDevices = devices.filter(
        (device) => device.kind === 'audiooutput'
      )
      this.isAuth = true
    },
    handleError(error) {
      // eslint-disable-next-line no-console
      console.error(
        'navigator.MediaDevices.getUserMedia error: ',
        error.message,
        error.name
      )
    },
  },
}
</script>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/_all"

.modal-settings ::v-deep
  p, label
    color: $black
  label.radio.button
    span
      white-space: break-spaces

  .b-tabs
    .tabs ul
      &::after
        @include from($desktop)
          content: ""
          height: 100%
          margin-left: auto
          border-right-color: #dbdbdb
          border-width: 1px
          width: 1px
          border-style: solid
      li a
        padding-top: 1rem
        padding-bottom: 1rem

    & > .tab-content
      min-height: 300px
</style>
