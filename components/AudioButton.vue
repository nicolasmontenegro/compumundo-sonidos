<template lang="pug">
.sound-button.is-flex(v-click-outside="clickOutside" :class="buttonFlexStyle")
  template(v-if="buttonType === 'modern'")
    b-button(
        rounded
        :size="templateType === 'list' ? 'is-small' : 'is-large'"
        type="is-primary"
        @click="togglePlayAudio"
        :class="{'is-light': isPlaying, 'is-small': (templateType === 'list'), 'is-large': (templateType != 'list')}") 
      b-icon(icon="volume-high" :customSize="templateType === 'list' ? 'mdi-8px' : 'mdi-24px'")
  template(v-if="buttonType === 'classic'")
    .button-classic(:class="{'is-small': (templateType === 'list'), 'is-large': (templateType != 'list')}") 
      img(v-if="!isPlaying" src="~assets/transparent_button_normal.png" @click="togglePlayAudio" )
      img(v-else src="~assets/transparent_button_pressed.png" @click="togglePlayAudio")
  p.is-family-monospace.title.is-6.is-dark(:class="buttonTextStyle" @click="(e) => (templateType === 'list' ? togglePlayAudio() : null ) ")
    | {{ title }}
  b-taglist.sound-button-tags.is-justify-content-center.m-0(v-if="categories")
    b-tag.mt-0.mb-1(type="is-info" v-for="category in categories" :key="`${title}-${category}`") {{ category }} 
  b-icon.sound-button-drag.m-0.px-1(v-if="canDragSounds" icon="drag" size="is-medium" :custom-class="templateType === 'list' ? '' : 'mdi-rotate-90'")
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
    templateType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      nodeAudio: null,
      isPlaying: false,
      fill: { gradient: ['red', 'green', 'blue'] },
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
    ...mapState('sounds', ['canDragSounds']),
    buttonFlexStyle() {
      if (this.templateType === 'list')
        return 'is-flex-direction-row is-align-items-center'
      else
        return 'is-flex-direction-column is-justify-items-center is-align-items-center my-2'
    },
    buttonTextStyle() {
      if (this.templateType === 'list')
        return 'has-text-left is-clickable is-flex-grow-1 px-3 py-2 m-0'
      else return 'has-text-centered my-2'
    },
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
  },
}
</script>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/_all"

.sound-button ::v-deep
  button
    transition: all 300ms ease-in-out
    
  .button-classic
    img
      cursor: pointer
      background-color: $blue
      border-radius: 50%
      width: auto
      height: 100%

  button, .button-classic
    &.is-large
      height: 4rem
      width: 4rem
    &.is-small
      height: 2rem
      width: 2rem

  .title
    color: $white

  .tag
    font-size: .625rem

  .fade-enter-active, .fade-leave-active
    transition: opacity .5s

  .fade-enter, .fade-leave-to
    opacity: 0
</style>
