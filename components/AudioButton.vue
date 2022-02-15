<template lang="pug">
.sound-button.is-flex.is-flex-direction-column.is-justify-items-center.is-align-items-center(v-click-outside="clickOutside")
  template(v-if="buttonType === 'modern'")
    b-button(rounded size="is-large" type="is-primary " @click="togglePlayAudio" :class="{'is-light': isPlaying}") 
      b-icon(icon="volume-high")
  template(v-if="buttonType === 'classic'")
    .button-classic
      img(v-if="!isPlaying" src="~assets/transparent_button_normal.png" @click="togglePlayAudio" )
      img(v-else src="~assets/transparent_button_pressed.png" @click="togglePlayAudio")
  p.is-family-monospace.has-text-centered.title.is-6.is-dark.my-2 {{ title }}
  b-taglist(v-if="categories")
    b-tag(type="is-info" v-for="category in categories" :key="`${title}-${category}`") {{ category }} 
  audio(:autoplay="false" preload="none")
    source(v-for="file in files" :src="`/sounds/${filename}.${file.extension}`" :type="`${file.codec}`" :key="`${filename}.${file.extension}`")
    | ERROR
</template>

<script>
import { mapState } from 'vuex'
import ClickOutside from 'vue-click-outside'

export default {
  name: 'AudioButton',
  directives: {
    ClickOutside,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    files: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
      default() {
        return []
      },
    },
    maxVolumeDb: {
      type: Number,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      nodeAudio: null,
      isPlaying: false,
      fill: { gradient: ['red', 'green', 'blue'] },
      gainAudio: {
        isSet: false,
        audioContext: null,
        sourceNode: null,
        gainNode: null,
      },
    }
  },
  computed: {
    ...mapState('settings', [
      'buttonType',
      'selectedDevice',
      'clickRepeatSound',
      'clickStopOtherSound',
      'clickOutsideStop',
    ]),
  },
  watch: {
    selectedDevice() {
      this.setOutputDevice()
    },
  },
  created() {
    this.$nuxt.$on('clickStopOtherSoundEvent', (component) => {
      if (component !== this) this.stopAudio(true)
    })
  },
  mounted() {
    this.nodeAudio = this.$el.querySelector('audio')
    this.nodeAudio.onplaying = () => {
      this.isPlaying = true
    }
    this.nodeAudio.onended = () => {
      this.isPlaying = false
    }

    this.setOutputDevice()
    this.createAudioContext()

    this.popupItem = this.$el
  },
  methods: {
    togglePlayAudio() {
      if (this.isPlaying) {
        this.stopAudio()
      } else {
        this.playAudio()
      }
    },
    playAudio() {
      if (!this.gainAudio.isSet) this.setGain()

      this.nodeAudio.play()
      if (this.clickStopOtherSound)
        this.$nuxt.$emit('clickStopOtherSoundEvent', this)
    },
    stopAudio(force = false) {
      this.nodeAudio.currentTime = 0
      if (!this.clickRepeatSound || force) {
        this.nodeAudio.pause()
        this.isPlaying = false
      }
    },
    setOutputDevice() {
      try {
        this.nodeAudio.setSinkId(this.selectedDevice).then(() => {})
      } catch (e) {}
    },
    clickOutside() {
      if (this.clickOutsideStop) this.stopAudio(true)
    },
    createAudioContext() {
      if (this.maxVolumeDb)
        this.gainAudio.audioContext = new (window.AudioContext ||
          window.webkitAudioContext)()

      if (!this.maxVolumeDb || !this.gainAudio.audioContext)
        this.gainAudio.isSet = true
    },
    setGain() {
      if (this.gainAudio.audioContext) {
        this.gainAudio.audioContext.resume()
        this.gainAudio.gainNode = this.gainAudio.audioContext.createGain()
        this.gainAudio.gainNode.gain.value = Math.pow(10, ((this.maxVolumeDb * -1) / 20))

        this.gainAudio.sourceNode =
          this.gainAudio.audioContext.createMediaElementSource(this.nodeAudio)
        this.gainAudio.sourceNode
          .connect(this.gainAudio.gainNode)
          .connect(this.gainAudio.audioContext.destination)
        this.gainAudio.isSet = true
      }
    },
  },
}
</script>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/_all"

.sound-button ::v-deep
  button
    transition: all 300ms ease-in-out
    height: 4rem
    width: 4rem
  .title
    color: $white
  .tag
    font-size: .625rem
  .button-classic
    height: 4rem
    width: 4rem

    img
      background-color: $blue
      border-radius: 50%
      width: auto
      height: 100%

  .fade-enter-active, .fade-leave-active
    transition: opacity .5s

  .fade-enter, .fade-leave-to
    opacity: 0
</style>
