<template lang="pug">
.sound-button.is-flex.is-flex-direction-column.is-justify-items-center.is-align-items-center
  b-button(rounded size="is-large" type="is-primary " @click="playAudio" :class="{'is-light': isPlaying}") 
    b-icon(icon="volume-high")
  p.is-family-monospace.has-text-centered.title.is-6.is-dark.my-1 {{ title }}
  b-taglist(v-if="categories")
    b-tag(type="is-info" v-for="category in categories" :key="`${title}-${category}`") {{ category }} 
  audio
    source(:src="`/sounds/${file.name}`" :type="`audio/${file.format}`")
    | Your browser does not support the audio element.
</template>

<script>
export default {
  name: 'AudioButton',
  props: {
    title: {
      type: String,
      required: true
    },
    file: {
      type: Object,
      required: true
    },
    categories: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      nodeAudio: null,
      isPlaying: false
    }
  },
  mounted() {
    this.nodeAudio = this.$el.querySelector("audio"); 
    this.nodeAudio.onplaying = (event) => {this.isPlaying = true}
    this.nodeAudio.onended = (event) => {this.isPlaying = false}
  },
  methods: {
    playAudio() { 
      if (this.isPlaying) {
        this.nodeAudio.pause();
        this.nodeAudio.currentTime = 0;
        this.isPlaying = false;
      } else {
        this.nodeAudio.play()
      }
    } 
  }
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
</style>