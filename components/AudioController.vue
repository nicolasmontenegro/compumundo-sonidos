<template lang="pug">
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState('settings', ['keybindingEsc']),
    },
    watch: {
        keybindingEsc: {
            handler() {
                if (this.keybindingEsc) {
                    document.addEventListener("keydown", this.handleKeybindingEsc);
                } else {
                    document.removeEventListener("keydown", this.handleKeybindingEsc);
                }
            },
            immediate: true
        }
    },
    methods: {
        handleKeybindingEsc(e) {
            if (e.key === 'Escape' || e.keyCode === 27) 
                this.$nuxt.$emit('clickStopOtherSoundEvent', null);
        }
    }
}
</script>

<style lang="sass" scoped>
</style>