export const state = () => ({
  buttonType: 'modern',
  selectedDevice: 'default',
  bgStyle: 'stars',
  isWide: false,
  clickRepeatSound: false,
  clickStopOtherSound: false,
  clickOutsideStop: false,
})

export const mutations = {
  setButtonType(state, value) {
    state.buttonType = value
  },
  setSelectedDevice(state, value) {
    state.selectedDevice = value
  },
  setBgStyles(state, value) {
    state.bgStyle = value
  },
  setIsWide(state, value) {
    state.isWide = value
  },
  setClickRepeatSound(state, value) {
    state.clickRepeatSound = value
  },
  setClickStopOtherSound(state, value) {
    state.clickStopOtherSound = value
    if (!value) state.clickOutsideStop = false
  },
  setClickOutsideStop(state, value) {
    state.clickOutsideStop = value
  },
}

export const getters = {
  buttonTypes(state) {
    return [
      {
        label: 'Modernsno',
        value: 'modern',
      },
      {
        label: 'Vejestorio',
        value: 'classic',
      },
    ]
  },
  bgStyles(state) {
    return [
      {
        label: 'Vacio',
        value: 'void',
      },
      {
        label: 'Lluvia de estrellas',
        value: 'stars',
      },
      {
        label: 'Tebi.moe',
        value: 'tebi',
      },
      {
        label: 'Telo Wide',
        value: 'telowide',
      },
    ]
  },
}
