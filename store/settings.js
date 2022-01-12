export const state = () => ({
  buttonType: 'modern',
  selectedDevice: 'default',
  bgStyle: 'stars'
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
    ]
  },
}
