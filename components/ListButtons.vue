<template lang="pug">
.list-buttons.pt-6(:class="{'container': !isWide}")
  VueDraggable.columns.is-flex-wrap-wrap.is-mobile(v-model='soundsOrder' :disabled="!canDragSounds" handle=".sound-button-drag")
    .column.item-sound(
      v-for="sound in soundsOrder" 
      :class="`${columsList} ${sound.visible ? 'is-visible' : ''}`"
      :key="`sound-${sound.originalPosition}`")
      AudioButton(v-bind="sound" :templateType="listButtonType")
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ListButtons',
  computed: {
    ...mapState('settings', ['isWide', 'listButtonType', 'listColumns', 'canDragSounds']),
    ...mapState('sounds', ['canDragSounds']),
    ...mapGetters('sounds', ['getSoundsSorted']),
    columsList() {
      if (this.listButtonType === 'list')
        return `is-12-mobile is-${12 / this.listColumns}-tablet is-${
          12 / this.listColumns
        }-desktop is-list`
      else if (this.isWide)
        return 'is-6-mobile is-2-tablet is-2-desktop is-1-widescreen'
      else return 'is-6-mobile is-4-tablet is-2-desktop'
    },
    soundsOrder: {
      get() {
        return this.getSoundsSorted
      },
      set(newValue) {
        return this.$store.commit(
          'sounds/setSoundsOrder',
          newValue.map(position => position.originalPosition))
      },
    }
  },
}
</script>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/_all"

.list-buttons
  position: relative

  & > .columns
    @media screen and (max-width: $tablet)
      margin: 0

  .is-list
    position: relative

    &:not(:last-of-type)
      &::after
        content: ''
        position: absolute
        bottom: 0
        left: 4%
        right: 4%
        border-bottom: 1px solid rgba(102,102,102,0.35)

  .item-sound
    &:not(.is-visible)
      display: none
</style>
