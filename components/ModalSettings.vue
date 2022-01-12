<template lang="pug">
.modal-settings
  span.is-clickable(@click='isModalActive = true')
    b-icon.mr-2(icon='cog' size="is-small")
    | Configuracion
  b-modal(v-model='isModalActive' @after-enter="refreshDevices()")
    .modal-card(style='width: auto')
      header.modal-card-head
        p.modal-card-title Configuración
      section.modal-card-body
        b-field(label='Estilo de botonera')
          b-select(v-model='buttonType' )
            option(v-for='option in buttonTypes' :value='option.value' :label="option.label" :key='option.value')
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

export default {
  name: 'ModalSettings',
  data() {
    return {
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
    selectedDevice: {
      get() {
        return this.$store.state.settings.selectedDevice
      },
      set(newValue) {
        return this.$store.commit('settings/setSelectedDevice', newValue)
      },
    },
    ...mapGetters({
      buttonTypes: 'settings/buttonTypes',
    }),
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
  p
    color: $black
</style>
