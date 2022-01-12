<template lang="pug">
.sound-button.is-flex.is-flex-direction-column.is-justify-items-center.is-align-items-center
  template(v-if="buttonType === 'modern'")
    b-button(rounded size="is-large" type="is-primary " @click="playAudio" :class="{'is-light': isPlaying}") 
      b-icon(icon="volume-high")
  template(v-if="buttonType === 'classic'")
    .button-classic
      img(v-if="!isPlaying" src="~assets/transparent_button_normal.png" @click="playAudio" )
      img(v-else src="~assets/transparent_button_pressed.png" @click="playAudio")
  p.is-family-monospace.has-text-centered.title.is-6.is-dark.my-2 {{ title }}
  b-taglist(v-if="categories")
    b-tag(type="is-info" v-for="category in categories" :key="`${title}-${category}`") {{ category }} 
  audio
    source(:src="`/sounds/${file.name}`" :type="`audio/${file.format}`")
    | ERROR
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AudioButton',
  props: {
    title: {
      type: String,
      required: true,
    },
    file: {
      type: Object,
      required: true,
    },
    categories: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      // buttonType: "modern", // "modern", "classic"
      nodeAudio: null,
      isPlaying: false,
      fill: { gradient: ['red', 'green', 'blue'] },
    }
  },
  computed: {
    ...mapState('settings', ['buttonType', 'selectedDevice']),
  },
  watch: {
    selectedDevice() {
      this.setOutputDevice()
    },
  },
  mounted() {
    this.nodeAudio = this.$el.querySelector('audio')
    this.nodeAudio.onplaying = (event) => {
      this.isPlaying = true
    }
    this.nodeAudio.onended = (event) => {
      this.isPlaying = false
    }
    this.setOutputDevice()
  },
  methods: {
    playAudio() {
      if (this.isPlaying) {
        this.nodeAudio.pause()
        this.nodeAudio.currentTime = 0
        this.isPlaying = false
      } else {
        this.nodeAudio.play()
      }
    },
    setOutputDevice() {
      try {
        this.nodeAudio.setSinkId(this.selectedDevice).then(() => {})
      } catch (e) {}
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
