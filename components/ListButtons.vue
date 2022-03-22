<template lang="pug">
.list-buttons.pt-6(:class="{'container': !isWide}")
  .columns.is-flex-wrap-wrap.is-mobile
    .column.item-sound(
      v-for="sound in sounds" 
      :class="`${columsList} ${sound.visible ? 'is-visible' : ''}`")
      AudioButton(v-bind="sound" :templateType="listButtonType")
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ListButtons',
  props: {
    sounds: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState('settings', ['isWide', 'listButtonType', 'listColumns']),
    columsList() {
      if (this.listButtonType === 'list')
        return `is-12-mobile is-${12 / this.listColumns}-tablet is-${
          12 / this.listColumns
        }-desktop is-list`
      else if (this.isWide)
        return 'is-6-mobile is-2-tablet is-2-desktop is-1-widescreen'
      else return 'is-6-mobile is-4-tablet is-2-desktop'
    },
  },
}
</script>

<style lang="sass" scoped>
.list-buttons
  position: relative

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
