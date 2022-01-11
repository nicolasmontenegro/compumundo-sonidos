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
        b-field(label="Para usar la opción de salida de audio, primero debes autorizar el uso de micrófono"  v-if="!isAuth && isCompatible")
          b-button(label='Solicitar permiso' type="is-primary"  @click="refreshDevices()")
        b-field(label='Dispotivo de salida de audio')
          b-select(placeholder='Select a name' @input='changeDevice' v-model='selectedDevice' :disabled="!isCompatible || !isAuth" expanded)
            option(v-for='option in listDevices' :value='option.deviceId' :key='option.deviceId')
              | {{ option.label }}
        p(v-if="!isCompatible")
          i Tu navegador no es compatible con esta opción  

</template>

<script>
export default {
  name: 'ModalSettings',
  data() {
    return {
      isModalActive: false,
      listDevices: [{deviceId: 'default', kind: 'audiooutput', label: 'Default', groupId: null}],
      selectedDevice: "default",
      isAuth: false
    }
  },
  methods: {
    refreshDevices() {
      if (this.isCompatible) {
        const constraints = {audio: true, video: false}
        navigator.mediaDevices.getUserMedia(constraints).then(this.stopSteam).then(this.gotDevices).catch(this.handleError);
      }
    },
    stopSteam(stream) {
      stream.getTracks().forEach(t => t.stop())
      return navigator.mediaDevices.enumerateDevices();
    },
    gotDevices(devices) {
      this.listDevices = devices.filter(device => (device.kind === "audiooutput"))
      this.isAuth = true 
    },
    changeDevice(value) {
      document.querySelectorAll("audio").forEach(audioElement => {audioElement.setSinkId(value).then(() => {})})
    },
    handleError(error) {
      console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
    }
  },
  computed: { 
    isCompatible() {
      try {
        return Boolean(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) 
      } catch (e) {
        return false  
      }
    }
  },
  mounted() {
  }
}
</script>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/_all"
.modal-settings ::v-deep
  p
    color: $black
</style>